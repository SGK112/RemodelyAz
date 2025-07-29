import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import mongoose from 'mongoose'

// Define the lead analytics schema
const leadAnalyticsSchema = new mongoose.Schema({
    sessionId: { type: String, required: true, unique: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    timeOnSite: { type: Number, required: true },
    pageViews: { type: Number, required: true },
    pagesViewed: [{ type: String }],
    maxScrollDepth: { type: Number, default: 0 },
    deviceType: { type: String, enum: ['desktop', 'tablet', 'mobile'], required: true },
    referrer: { type: String },
    isConverted: { type: Boolean, default: false },
    conversionType: { type: String, enum: ['quick_quote', 'contact_form', 'phone_call', 'email'] },
    engagementScore: { type: Number, default: 0 },
    events: [{
        type: { type: String, required: true },
        data: { type: mongoose.Schema.Types.Mixed },
        timestamp: { type: Date, required: true },
        page: { type: String, required: true }
    }],
    createdAt: { type: Date, default: Date.now }
})

// Create or get the LeadAnalytics model
const LeadAnalytics = mongoose.models.LeadAnalytics || mongoose.model('LeadAnalytics', leadAnalyticsSchema)

export async function POST(request: NextRequest) {
    try {
        const { session, events } = await request.json()

        // Validate required data
        if (!session || !session.id) {
            return NextResponse.json(
                { error: 'Invalid session data' },
                { status: 400 }
            )
        }

        // Calculate engagement metrics
        const engagementScore = calculateEngagementScore(session)
        const maxScrollDepth = Math.max(...session.events
            .filter((e: any) => e.type === 'scroll_depth')
            .map((e: any) => e.data?.depth || 0), 0)

        const analyticsData = {
            sessionId: session.id,
            startTime: new Date(session.startTime),
            endTime: new Date(),
            timeOnSite: session.timeOnSite,
            pageViews: session.pagesViewed.length,
            pagesViewed: session.pagesViewed,
            maxScrollDepth,
            deviceType: session.deviceType,
            referrer: session.referrer,
            isConverted: session.isConverted,
            conversionType: session.conversionType,
            engagementScore,
            events: session.events.map((event: any) => ({
                type: event.type,
                data: event.data,
                timestamp: new Date(event.timestamp),
                page: event.page
            }))
        }

        // Try to connect to database (gracefully handle failures)
        try {
            const connection = await dbConnect()
            
            if (connection) {
                // Update or create analytics record
                await LeadAnalytics.findOneAndUpdate(
                    { sessionId: session.id },
                    analyticsData,
                    { upsert: true, new: true }
                )
                console.log('Lead analytics saved successfully')
            } else {
                console.warn('MongoDB not available, skipping analytics save')
            }
        } catch (dbError) {
            console.error('Database error (continuing without save):', dbError)
        }

        // Return success with engagement insights
        return NextResponse.json({ 
            success: true,
            engagementScore,
            insights: generateInsights(analyticsData)
        })

    } catch (error) {
        console.error('Lead analytics error:', error)
        return NextResponse.json(
            { error: 'Failed to process analytics' },
            { status: 500 }
        )
    }
}

// Get analytics dashboard data
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const days = parseInt(searchParams.get('days') || '7', 10)
        const startDate = new Date()
        startDate.setDate(startDate.getDate() - days)

        const connection = await dbConnect()
        if (!connection) {
            return NextResponse.json({ error: 'Database not available' }, { status: 503 })
        }

        // Get analytics summary
        const totalSessions = await LeadAnalytics.countDocuments({
            createdAt: { $gte: startDate }
        })

        const conversions = await LeadAnalytics.countDocuments({
            createdAt: { $gte: startDate },
            isConverted: true
        })

        const avgEngagement = await LeadAnalytics.aggregate([
            { $match: { createdAt: { $gte: startDate } } },
            { $group: { _id: null, avgScore: { $avg: '$engagementScore' } } }
        ])

        const deviceBreakdown = await LeadAnalytics.aggregate([
            { $match: { createdAt: { $gte: startDate } } },
            { $group: { _id: '$deviceType', count: { $sum: 1 } } }
        ])

        const conversionTypes = await LeadAnalytics.aggregate([
            { 
                $match: { 
                    createdAt: { $gte: startDate },
                    isConverted: true 
                } 
            },
            { $group: { _id: '$conversionType', count: { $sum: 1 } } }
        ])

        const topPages = await LeadAnalytics.aggregate([
            { $match: { createdAt: { $gte: startDate } } },
            { $unwind: '$pagesViewed' },
            { $group: { _id: '$pagesViewed', views: { $sum: 1 } } },
            { $sort: { views: -1 } },
            { $limit: 10 }
        ])

        return NextResponse.json({
            summary: {
                totalSessions,
                conversions,
                conversionRate: totalSessions > 0 ? (conversions / totalSessions * 100).toFixed(2) : 0,
                avgEngagementScore: avgEngagement[0]?.avgScore?.toFixed(1) || 0
            },
            deviceBreakdown,
            conversionTypes,
            topPages
        })

    } catch (error) {
        console.error('Analytics dashboard error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch analytics' },
            { status: 500 }
        )
    }
}

function calculateEngagementScore(session: any): number {
    let score = 0
    
    // Time on site (max 40 points)
    score += Math.min(session.timeOnSite / 3, 40)
    
    // Page views (max 20 points)
    score += Math.min(session.pagesViewed.length * 5, 20)
    
    // Scroll depth (max 20 points)
    const maxScrollDepth = Math.max(...session.events
        .filter((e: any) => e.type === 'scroll_depth')
        .map((e: any) => e.data?.depth || 0), 0)
    score += (maxScrollDepth / 100) * 20
    
    // Events engagement (max 20 points)
    const engagementEvents = session.events.filter((e: any) => 
        ['cta_click', 'form_start', 'phone_click', 'email_click'].includes(e.type)
    )
    score += Math.min(engagementEvents.length * 5, 20)
    
    return Math.round(score)
}

function generateInsights(analyticsData: any): string[] {
    const insights = []
    
    if (analyticsData.engagementScore > 70) {
        insights.push('High engagement - excellent prospect')
    } else if (analyticsData.engagementScore > 40) {
        insights.push('Moderate engagement - good lead potential')
    } else {
        insights.push('Low engagement - may need different approach')
    }
    
    if (analyticsData.timeOnSite > 120) {
        insights.push('Spent significant time on site - strong interest')
    }
    
    if (analyticsData.pageViews > 3) {
        insights.push('Explored multiple pages - researching actively')
    }
    
    if (analyticsData.maxScrollDepth > 75) {
        insights.push('Read content thoroughly - engaged reader')
    }
    
    if (analyticsData.deviceType === 'mobile') {
        insights.push('Mobile user - ensure mobile-optimized experience')
    }
    
    return insights
}
