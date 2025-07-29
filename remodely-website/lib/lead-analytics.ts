// Lead Analytics Service for tracking user engagement and optimizing conversion

interface LeadEvent {
    type: 'page_view' | 'time_milestone' | 'scroll_depth' | 'cta_click' | 'form_start' | 'form_submit' | 'phone_click' | 'email_click'
    data?: Record<string, any>
    timestamp: Date
    sessionId: string
    page: string
}

interface LeadSession {
    id: string
    startTime: Date
    timeOnSite: number
    pagesViewed: string[]
    events: LeadEvent[]
    isConverted: boolean
    conversionType?: 'quick_quote' | 'contact_form' | 'phone_call' | 'email'
    deviceType: 'desktop' | 'tablet' | 'mobile'
    referrer?: string
}

class LeadAnalyticsService {
    private static instance: LeadAnalyticsService
    private sessionId: string
    private session: LeadSession
    private timeOnPageStart: Date
    private scrollDepth: number = 0
    private maxScrollDepth: number = 0

    private constructor() {
        this.sessionId = this.generateSessionId()
        this.timeOnPageStart = new Date()
        this.session = {
            id: this.sessionId,
            startTime: new Date(),
            timeOnSite: 0,
            pagesViewed: [window.location.pathname],
            events: [],
            isConverted: false,
            deviceType: this.getDeviceType(),
            referrer: document.referrer || undefined
        }

        this.setupEventListeners()
        this.trackPageView()
    }

    static getInstance(): LeadAnalyticsService {
        if (!LeadAnalyticsService.instance) {
            LeadAnalyticsService.instance = new LeadAnalyticsService()
        }
        return LeadAnalyticsService.instance
    }

    private generateSessionId(): string {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    }

    private getDeviceType(): 'desktop' | 'tablet' | 'mobile' {
        const width = window.innerWidth
        if (width <= 768) return 'mobile'
        if (width <= 1024) return 'tablet'
        return 'desktop'
    }

    private setupEventListeners() {
        // Track scroll depth
        window.addEventListener('scroll', this.handleScroll.bind(this))
        
        // Track time milestones
        setInterval(() => {
            this.session.timeOnSite += 1
            if (this.session.timeOnSite % 30 === 0) { // Every 30 seconds
                this.trackEvent('time_milestone', { seconds: this.session.timeOnSite })
            }
        }, 1000)

        // Track clicks on phone numbers and email links
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement
            const link = target.closest('a')
            
            if (link) {
                if (link.href.startsWith('tel:')) {
                    this.trackPhoneClick(link.href)
                } else if (link.href.startsWith('mailto:')) {
                    this.trackEmailClick(link.href)
                }
            }
        })

        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.saveSession()
            }
        })

        // Track before page unload
        window.addEventListener('beforeunload', () => {
            this.saveSession()
        })
    }

    private handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        this.scrollDepth = Math.round((scrollTop / docHeight) * 100)
        
        if (this.scrollDepth > this.maxScrollDepth) {
            this.maxScrollDepth = this.scrollDepth
            
            // Track significant scroll milestones
            if (this.maxScrollDepth >= 25 && this.maxScrollDepth < 50) {
                this.trackEvent('scroll_depth', { depth: 25 })
            } else if (this.maxScrollDepth >= 50 && this.maxScrollDepth < 75) {
                this.trackEvent('scroll_depth', { depth: 50 })
            } else if (this.maxScrollDepth >= 75) {
                this.trackEvent('scroll_depth', { depth: 75 })
            }
        }
    }

    private trackEvent(type: LeadEvent['type'], data?: Record<string, any>) {
        const event: LeadEvent = {
            type,
            data,
            timestamp: new Date(),
            sessionId: this.sessionId,
            page: window.location.pathname
        }

        this.session.events.push(event)

        // Send high-priority events immediately
        if (['form_submit', 'phone_click', 'email_click'].includes(type)) {
            this.sendAnalytics([event])
        }
    }

    trackPageView() {
        const path = window.location.pathname
        if (!this.session.pagesViewed.includes(path)) {
            this.session.pagesViewed.push(path)
        }
        this.trackEvent('page_view', { path })
    }

    trackCTAClick(ctaType: string, location: string) {
        this.trackEvent('cta_click', { ctaType, location })
    }

    trackFormStart(formType: string) {
        this.trackEvent('form_start', { formType })
    }

    trackFormSubmit(formType: string, success: boolean = true) {
        this.trackEvent('form_submit', { formType, success })
        
        if (success) {
            this.session.isConverted = true
            this.session.conversionType = formType === 'quick_quote' ? 'quick_quote' : 'contact_form'
        }
    }

    trackPhoneClick(phoneNumber: string) {
        this.trackEvent('phone_click', { phoneNumber })
        this.session.isConverted = true
        this.session.conversionType = 'phone_call'
    }

    trackEmailClick(email: string) {
        this.trackEvent('email_click', { email })
        this.session.isConverted = true
        this.session.conversionType = 'email'
    }

    private async sendAnalytics(events: LeadEvent[]) {
        try {
            await fetch('/api/analytics/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session: this.session,
                    events
                })
            })
        } catch (error) {
            console.error('Failed to send analytics:', error)
        }
    }

    private saveSession() {
        try {
            localStorage.setItem('leadSession', JSON.stringify(this.session))
            this.sendAnalytics(this.session.events.slice(-10)) // Send last 10 events
        } catch (error) {
            console.error('Failed to save session:', error)
        }
    }

    // Get engagement metrics for optimization
    getEngagementScore(): number {
        let score = 0
        
        // Time on site (max 40 points)
        score += Math.min(this.session.timeOnSite / 3, 40) // 1 point per 3 seconds, max 40
        
        // Page views (max 20 points)
        score += Math.min(this.session.pagesViewed.length * 5, 20)
        
        // Scroll depth (max 20 points)  
        score += (this.maxScrollDepth / 100) * 20
        
        // Events engagement (max 20 points)
        const engagementEvents = this.session.events.filter(e => 
            ['cta_click', 'form_start', 'phone_click', 'email_click'].includes(e.type)
        )
        score += Math.min(engagementEvents.length * 5, 20)
        
        return Math.round(score)
    }

    shouldShowEngagementPrompt(): boolean {
        const score = this.getEngagementScore()
        const timeOnSite = this.session.timeOnSite
        
        // Show if high engagement but no conversion after 45 seconds
        return score > 30 && timeOnSite > 45 && !this.session.isConverted
    }

    shouldShowExitIntent(): boolean {
        const score = this.getEngagementScore()
        const timeOnSite = this.session.timeOnSite
        
        // Show exit intent if moderate engagement after 20 seconds
        return score > 15 && timeOnSite > 20 && !this.session.isConverted
    }
}

// Export singleton instance
export const leadAnalytics = typeof window !== 'undefined' ? LeadAnalyticsService.getInstance() : null
export default LeadAnalyticsService
