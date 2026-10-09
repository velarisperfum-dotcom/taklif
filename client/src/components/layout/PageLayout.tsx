import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export const PageLayout: React.FC<{ children: React.ReactNode; showFooter?: boolean }> = ({
  children,
  showFooter = true,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900">
      <Navbar />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}
