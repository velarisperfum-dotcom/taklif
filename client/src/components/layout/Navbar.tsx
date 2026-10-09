import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, Menu, X, PlusCircle, LayoutDashboard, Heart } from 'lucide-react'

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-stone-50/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-[1.5px] shadow-sm transition-transform group-hover:scale-105">
            <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center text-amber-300">
              <Heart className="w-5 h-5 fill-amber-300/30 text-amber-300" />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif-cormorant text-2xl font-bold tracking-widest text-stone-900 uppercase">
              Taklifnoma
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-amber-700 font-semibold -mt-1">
              Premium Wedding Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <Link to="/" className="hover:text-stone-900 transition-colors">
            Bosh sahifa
          </Link>
          <a
            href={isHome ? '#gallery' : '/#gallery'}
            className="hover:text-stone-900 transition-colors"
          >
            Taklifnomalar
          </a>
          <a
            href={isHome ? '#how-it-works' : '/#how-it-works'}
            className="hover:text-stone-900 transition-colors"
          >
            Qanday ishlaydi?
          </a>
          <a
            href={isHome ? '#pricing' : '/#pricing'}
            className="hover:text-stone-900 transition-colors"
          >
            Narxlar
          </a>
          <a
            href={isHome ? '#faq' : '/#faq'}
            className="hover:text-stone-900 transition-colors"
          >
            FAQ
          </a>
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 hover:text-stone-900 transition-colors text-stone-700 font-semibold"
          >
            <LayoutDashboard className="w-4 h-4 text-amber-600" />
            <span>Kabinet</span>
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-50 text-sm font-semibold tracking-wide transition-all shadow-md shadow-stone-900/10 active:scale-95 group"
          >
            <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>Taklifnoma yaratish</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            to="/create"
            className="p-2 rounded-full bg-amber-500 text-stone-950 font-semibold shadow-sm"
            title="Yaratish"
          >
            <PlusCircle className="w-5 h-5" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            aria-label="Menyu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-stone-50 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-stone-700 rounded-lg hover:bg-stone-100"
          >
            Bosh sahifa
          </Link>
          <a
            href="/#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-stone-700 rounded-lg hover:bg-stone-100"
          >
            Taklifnomalar
          </a>
          <a
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-stone-700 rounded-lg hover:bg-stone-100"
          >
            Qanday ishlaydi?
          </a>
          <a
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-stone-700 rounded-lg hover:bg-stone-100"
          >
            Narxlar
          </a>
          <a
            href="/#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-stone-700 rounded-lg hover:bg-stone-100"
          >
            FAQ
          </a>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-base font-medium text-amber-700 rounded-lg hover:bg-amber-50"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Kabinetim (Mening taklifnomalarim)</span>
          </Link>
          <div className="pt-2">
            <Link
              to="/create"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full bg-stone-900 text-stone-50 font-semibold flex items-center justify-center gap-2 text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Taklifnoma yaratish</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
