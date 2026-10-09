import React, { useState } from 'react'
import { X, Copy, Check, Send, MessageCircle, QrCode } from 'lucide-react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  title: string
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  url,
  title,
}) => {
  const [copied, setCopied] = useState(false)
  const [showQr, setShowQr] = useState(false)

  if (!isOpen) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const shareText = encodeURIComponent(`${title} — Sizni to‘yimizga taklif etamiz!`)
  const shareUrl = encodeURIComponent(url)

  const telegramUrl = `https://t.me/share/url?url=${shareUrl}&text=${shareText}`
  const whatsAppUrl = `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`
  const qrCodeImg = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(url)}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-stone-900 border border-stone-800 text-stone-100 rounded-3xl p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-3">
            <Send className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-serif-cormorant font-bold">Taklifnomani ulashish</h3>
          <p className="text-xs text-stone-400 mt-1">
            Yaqinlaringizga qulay ijtimoiy tarmoqlar orqali yuboring
          </p>
        </div>

        {/* Link box */}
        <div className="flex items-center gap-2 p-2 bg-stone-950/70 border border-stone-800 rounded-2xl mb-6">
          <input
            type="text"
            readOnly
            value={url}
            className="flex-1 bg-transparent text-xs text-stone-300 px-3 py-1.5 outline-none truncate"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-medium text-xs rounded-xl transition-all shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-stone-950" />
                <span>Nusxalandi!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Nusxa olish</span>
              </>
            )}
          </button>
        </div>

        {/* Quick share channels */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-sky-400 transition-all group"
          >
            <Send className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-medium">Telegram</span>
          </a>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 transition-all group"
          >
            <MessageCircle className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-medium">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setShowQr(!showQr)}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 transition-all group cursor-pointer"
          >
            <QrCode className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-medium">QR Kod</span>
          </button>
        </div>

        {/* QR Code view */}
        {showQr && (
          <div className="p-4 bg-white rounded-2xl text-center mb-4 transition-all">
            <img
              src={qrCodeImg}
              alt="QR Code"
              className="w-44 h-44 mx-auto rounded-lg shadow"
            />
            <p className="text-[11px] text-stone-600 mt-2 font-medium">
              Kamerangiz orqali skanerlang
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl border border-stone-800 text-stone-400 hover:text-stone-200 text-xs font-medium transition-colors"
        >
          Yopish
        </button>
      </div>
    </div>
  )
}
