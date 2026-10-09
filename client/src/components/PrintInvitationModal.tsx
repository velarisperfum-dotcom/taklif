import React, { useEffect } from 'react'
import { Printer, X, Download, QrCode } from 'lucide-react'

interface PrintInvitationModalProps {
  isOpen: boolean
  onClose: () => void
  invitation: {
    groomName: string
    brideName: string
    groomParents?: string | null
    brideParents?: string | null
    weddingDate: string
    weddingTime: string
    venueName: string
    venueAddress: string
    invitationMessage?: string | null
    coverTitle?: string | null
    publicSlug?: string
  }
}

export const PrintInvitationModal: React.FC<PrintInvitationModalProps> = ({
  isOpen,
  onClose,
  invitation,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
      document.body.classList.remove('printing-card')
    }
    return () => {
      document.body.classList.remove('overflow-hidden')
      document.body.classList.remove('printing-card')
    }
  }, [isOpen])

  if (!isOpen) return null

  const liveUrl = invitation.publicSlug
    ? `${window.location.origin}/t/${invitation.publicSlug}`
    : window.location.href

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&format=svg&data=${encodeURIComponent(
    liveUrl
  )}`

  const handlePrint = () => {
    document.body.classList.add('printing-card')
    window.print()
    setTimeout(() => {
      document.body.classList.remove('printing-card')
    }, 500)
  }

  // Format wedding date to readable Uzbek format
  const formatUzbekDate = (dateStr: string) => {
    try {
      if (!dateStr) return 'To‘y kuni'
      const parts = dateStr.split('-')
      if (parts.length !== 3) return dateStr
      const months = [
        'yanvar',
        'fevral',
        'mart',
        'aprel',
        'may',
        'iyun',
        'iyul',
        'avgust',
        'sentabr',
        'oktabr',
        'noyabr',
        'dekabr',
      ]
      const year = parts[0]
      const month = months[parseInt(parts[1], 10) - 1] || parts[1]
      const day = parseInt(parts[2], 10)
      return `${year}-yil ${day}-${month}`
    } catch {
      return dateStr
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 no-print">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold block">
              Qog‘ozga yoki PDF ga chiqarish
            </span>
            <h3 className="text-lg sm:text-xl font-serif-cormorant font-bold text-stone-900">
              Taklifnomani chop etish
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons Bar */}
        <div className="p-4 bg-amber-500/10 border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-amber-900 font-medium">
            💡 Ushbu taklifnomani A5/A6 qog‘ozda chop etishingiz yoki PDF qilib saqlashingiz mumkin.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Chop etish (Print / PDF)</span>
            </button>
          </div>
        </div>

        {/* Card Preview Container */}
        <div className="p-4 sm:p-8 bg-stone-200/50 flex justify-center overflow-auto max-h-[70vh]">
          {/* Printable Wedding Card (Target for @media print) */}
          <div
            id="printable-wedding-card"
            className="w-full max-w-[480px] bg-[#fdfbf7] text-stone-900 rounded-2xl shadow-xl p-8 sm:p-10 border-8 border-double border-amber-700/40 relative flex flex-col justify-between text-center select-none"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              boxSizing: 'border-box',
            }}
          >
            {/* Corner Ornaments */}
            <span className="absolute top-3 left-3 text-amber-700/60 text-lg leading-none select-none">
              ❖
            </span>
            <span className="absolute top-3 right-3 text-amber-700/60 text-lg leading-none select-none">
              ❖
            </span>
            <span className="absolute bottom-3 left-3 text-amber-700/60 text-lg leading-none select-none">
              ❖
            </span>
            <span className="absolute bottom-3 right-3 text-amber-700/60 text-lg leading-none select-none">
              ❖
            </span>

            {/* Inner Border */}
            <div className="border border-amber-600/30 p-6 sm:p-8 rounded-lg flex flex-col items-center justify-between min-h-[580px]">
              {/* Header Inscription */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-800/80 font-semibold font-sans">
                  Bismillahir Rohmanir Rohiym
                </p>
                <div className="w-16 h-[1px] bg-amber-600/40 mx-auto my-2" />
                <h4 className="text-sm uppercase tracking-[0.25em] text-stone-600 font-sans font-medium">
                  {invitation.coverTitle || 'To‘y Taklifnomasi'}
                </h4>
              </div>

              {/* Couple Names */}
              <div className="my-6">
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
                  {invitation.groomName}
                </h1>
                <div className="flex items-center justify-center gap-3 my-1">
                  <span className="h-[1px] w-8 bg-amber-700/40" />
                  <span className="text-2xl font-serif text-amber-700 italic">&</span>
                  <span className="h-[1px] w-8 bg-amber-700/40" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
                  {invitation.brideName}
                </h1>
              </div>

              {/* Parents (if provided) */}
              {(invitation.groomParents || invitation.brideParents) && (
                <div className="text-xs text-stone-600 italic max-w-sm mb-4">
                  {invitation.groomParents && <p>Hurmat bilan: {invitation.groomParents}</p>}
                  {invitation.brideParents && <p>{invitation.brideParents}</p>}
                </div>
              )}

              {/* Invitation Message */}
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-sm my-3 italic">
                {invitation.invitationMessage ||
                  'Hurmatli mehmonimiz! Sizni hayotimizdagi eng quvonchli va unutilmas kunimiz — nikoh to‘yimiz munosabati bilan yoziladigan dasturxonimizga lutfan taklif etamiz.'}
              </p>

              {/* Date & Time */}
              <div className="my-5 py-3 px-6 rounded-full bg-amber-500/10 border border-amber-600/20 inline-block">
                <p className="text-base sm:text-lg font-bold text-amber-900">
                  {formatUzbekDate(invitation.weddingDate)}
                </p>
                <p className="text-xs uppercase tracking-widest text-stone-600 font-sans font-semibold mt-0.5">
                  Boshlanish vaqti: {invitation.weddingTime}
                </p>
              </div>

              {/* Venue */}
              <div className="space-y-1 my-2">
                <p className="text-xs uppercase tracking-widest text-amber-800 font-sans font-bold">
                  Manzil
                </p>
                <p className="text-lg font-bold text-stone-900">{invitation.venueName}</p>
                <p className="text-xs text-stone-600 max-w-xs">{invitation.venueAddress}</p>
              </div>

              {/* QR Code and digital note */}
              <div className="pt-4 border-t border-amber-600/20 w-full flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="bg-white p-2 rounded-xl border border-stone-200 shadow-sm shrink-0">
                  <img
                    src={qrCodeUrl}
                    alt="Taklifnoma QR kodi"
                    className="w-18 h-18 sm:w-20 sm:h-20"
                    loading="eager"
                  />
                </div>
                <div className="text-left max-w-[200px]">
                  <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-amber-800 font-sans">
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Jonli Taklifnoma</span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-tight mt-0.5 font-sans">
                    Kamerangiz orqali skaner qilib, xaritani oching va tilak qoldiring.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Hajmi: Standart to‘y taklifnomasi (A5 / A6)
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full border border-stone-300 text-stone-700 font-medium text-xs hover:bg-stone-200 transition-colors cursor-pointer"
            >
              Yopish
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-6 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-2 transition-all shadow cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Chop etish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
