'use client'

import { useState } from 'react'
import LeadEngagementTracker from './LeadEngagementTracker'
import QuickQuoteModal from './QuickQuoteModal'
import StickyContactBar from './StickyContactBar'

const LeadEngagementWrapper = () => {
    const [showQuickQuote, setShowQuickQuote] = useState(false)

    return (
        <>
            <LeadEngagementTracker onQuickQuote={() => setShowQuickQuote(true)} />
            <StickyContactBar onQuickQuote={() => setShowQuickQuote(true)} />
            <QuickQuoteModal 
                isOpen={showQuickQuote} 
                onClose={() => setShowQuickQuote(false)} 
            />
        </>
    )
}

export default LeadEngagementWrapper
