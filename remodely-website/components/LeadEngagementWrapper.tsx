'use client'

import { useState, useEffect } from 'react'
import LeadEngagementTracker from './LeadEngagementTracker'
import QuickQuoteModal from './QuickQuoteModal'
import StickyContactBar from './StickyContactBar'
import { popupPersistence } from '@/lib/popup-persistence'

const LeadEngagementWrapper = () => {
    const [showQuickQuote, setShowQuickQuote] = useState(false)

    const handleQuickQuoteOpen = () => {
        // Only show if not recently dismissed
        if (!popupPersistence.isDismissed('quickQuoteModal')) {
            setShowQuickQuote(true)
        }
    }

    return (
        <>
            <LeadEngagementTracker onQuickQuote={handleQuickQuoteOpen} />
            <StickyContactBar onQuickQuote={handleQuickQuoteOpen} />
            <QuickQuoteModal
                isOpen={showQuickQuote}
                onClose={() => setShowQuickQuote(false)}
            />
        </>
    )
}

export default LeadEngagementWrapper
