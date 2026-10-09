import React from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-serif-cormorant font-bold text-stone-900 mb-2">
        404 — Sahifa topilmadi
      </h1>
      <p className="text-sm text-stone-600 max-w-md mb-6 leading-relaxed">
        Kechirasiz, siz qidirgan sahifa mavjud emas yoki boshqa manzilga ko‘chirilgan.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-all shadow"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Bosh sahifaga qaytish</span>
      </Link>
    </div>
  )
}
