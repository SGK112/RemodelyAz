// Utility for managing popup dismissal persistence

export type PopupType = 'exitIntent' | 'timePrompt' | 'stickyContactBar' | 'quickQuoteModal'

export interface PopupPersistence {
    isDismissed: (popupType: PopupType) => boolean
    dismissPopup: (popupType: PopupType, durationHours?: number) => void
    clearDismissal: (popupType: PopupType) => void
    clearAllDismissals: () => void
}

class PopupPersistenceManager implements PopupPersistence {
    private getStorageKey(popupType: PopupType): string {
        return `popup_dismissed_${popupType}`
    }

    isDismissed(popupType: PopupType): boolean {
        if (typeof window === 'undefined') return false

        try {
            const dismissedUntil = localStorage.getItem(this.getStorageKey(popupType))
            if (!dismissedUntil) return false

            const dismissTime = parseInt(dismissedUntil, 10)
            const now = Date.now()

            if (now > dismissTime) {
                // Dismissal period has expired, clean up
                localStorage.removeItem(this.getStorageKey(popupType))
                return false
            }

            return true
        } catch (error) {
            console.error('Error checking popup dismissal:', error)
            return false
        }
    }

    dismissPopup(popupType: PopupType, durationHours: number = 24): void {
        if (typeof window === 'undefined') return

        try {
            const dismissUntil = Date.now() + (durationHours * 60 * 60 * 1000)
            localStorage.setItem(this.getStorageKey(popupType), dismissUntil.toString())
        } catch (error) {
            console.error('Error dismissing popup:', error)
        }
    }

    clearDismissal(popupType: PopupType): void {
        if (typeof window === 'undefined') return

        try {
            localStorage.removeItem(this.getStorageKey(popupType))
        } catch (error) {
            console.error('Error clearing popup dismissal:', error)
        }
    }

    clearAllDismissals(): void {
        if (typeof window === 'undefined') return

        try {
            const popupTypes: PopupType[] = ['exitIntent', 'timePrompt', 'stickyContactBar', 'quickQuoteModal']
            popupTypes.forEach(type => {
                localStorage.removeItem(this.getStorageKey(type))
            })
        } catch (error) {
            console.error('Error clearing all popup dismissals:', error)
        }
    }
}

export const popupPersistence = new PopupPersistenceManager()
