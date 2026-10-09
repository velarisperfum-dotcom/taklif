// Telegram WebApp helper utilities

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string
        initDataUnsafe: {
          user?: {
            id: number
            first_name: string
            last_name?: string
            username?: string
            language_code?: string
          }
        }
        version: string
        platform: string
        colorScheme: 'light' | 'dark'
        themeParams: Record<string, string>
        isExpanded: boolean
        viewportHeight: number
        viewportStableHeight: number
        headerColor: string
        backgroundColor: string
        BackButton: {
          isVisible: boolean
          show: () => void
          hide: () => void
          onClick: (callback: () => void) => void
          offClick: (callback: () => void) => void
        }
        MainButton: {
          text: string
          color: string
          textColor: string
          isVisible: boolean
          isActive: boolean
          isProgressVisible: boolean
          setText: (text: string) => void
          onClick: (callback: () => void) => void
          offClick: (callback: () => void) => void
          show: () => void
          hide: () => void
          enable: () => void
          disable: () => void
          showProgress: (leaveActive?: boolean) => void
          hideProgress: () => void
        }
        HapticFeedback: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void
          selectionChanged: () => void
        }
        ready: () => void
        expand: () => void
        close: () => void
        enableClosingConfirmation: () => void
        setHeaderColor: (color: string) => void
        setBackgroundColor: (color: string) => void
        openLink: (url: string) => void
        openTelegramLink: (url: string) => void
        showAlert: (message: string, callback?: () => void) => void
        showConfirm: (message: string, callback?: (result: boolean) => void) => void
      }
    }
  }
}

export function getTelegramWebApp() {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    return window.Telegram.WebApp
  }
  return null
}

export function isTelegramMiniApp(): boolean {
  const tg = getTelegramWebApp()
  return Boolean(tg && tg.initData)
}

export function initTelegramApp() {
  const tg = getTelegramWebApp()
  if (tg) {
    try {
      tg.ready()
      tg.expand()
      tg.enableClosingConfirmation()
      tg.setHeaderColor('#fafaf9')
      tg.setBackgroundColor('#fafaf9')
    } catch (e) {
      console.warn('Telegram WebApp init warning:', e)
    }
  }
}

export function hapticFeedback(type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error') {
  const tg = getTelegramWebApp()
  if (!tg?.HapticFeedback) return

  try {
    if (type === 'success' || type === 'warning' || type === 'error') {
      tg.HapticFeedback.notificationOccurred(type)
    } else {
      tg.HapticFeedback.impactOccurred(type)
    }
  } catch (e) {
    // Ignore in unsupported environments
  }
}

export function shareToTelegram(url: string, text: string) {
  const tg = getTelegramWebApp()
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
  
  if (tg) {
    tg.openTelegramLink(shareUrl)
  } else {
    window.open(shareUrl, '_blank')
  }
}
