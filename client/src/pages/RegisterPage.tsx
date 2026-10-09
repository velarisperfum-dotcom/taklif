import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service'
import { Heart, User as UserIcon, Mail, ArrowRight } from 'lucide-react'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError(null)
      await authService.register(name, email)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Ro‘yxatdan o‘tishda xatolik')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-stone-200 shadow-xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 fill-amber-500/20" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-cormorant font-bold text-stone-900">
            Ro‘yxatdan o‘tish
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Yangi hisob yarating va taklifnomalaringizni doimiy saqlang
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Ismingiz
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masalan: Sardor"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-200 text-sm outline-none bg-stone-50 focus:border-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5">
              Email manzilingiz
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="masalan@domain.uz"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-stone-200 text-sm outline-none bg-stone-50 focus:border-stone-900"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-all shadow cursor-pointer active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Yaratilmoqda...' : 'Hisob yaratish'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-stone-500">
          Hisobingiz bormi?{' '}
          <Link to="/login" className="font-semibold text-amber-700 hover:underline">
            Kirish
          </Link>
        </div>
      </div>
    </div>
  )
}
