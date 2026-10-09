import React, { useState, useMemo } from 'react'
import { useTemplates } from '../hooks/useTemplates'
import { TemplateFilters } from '../components/templates/TemplateFilters'
import { TemplateGrid } from '../components/templates/TemplateGrid'
import { PreviewModal } from '../components/PreviewModal'
import { Template } from '../types/template'

const CATEGORIES = [
  'Barchasi',
  'Milliy',
  'Premium',
  'Minimalistik',
  'Romantik',
  'Zamonaviy',
  'Gulli',
  'Klassik',
]

export const TemplatesPage: React.FC = () => {
  const { templates, loading } = useTemplates()
  const [selectedCategory, setSelectedCategory] = useState('Barchasi')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'popular' | 'name'>('popular')
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)

  const filteredTemplates = useMemo(() => {
    return templates
      .filter((t) => {
        const matchesCategory =
          selectedCategory === 'Barchasi' || t.category === selectedCategory
        const matchesSearch =
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesCategory && matchesSearch
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name)
        return 0
      })
  }, [templates, selectedCategory, searchQuery, sortBy])

  return (
    <div className="min-h-screen bg-stone-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-amber-700 block mb-1">
            Kolleksiya
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif-cormorant font-bold text-stone-900">
            Barcha To‘y Shablonlari
          </h1>
          <p className="text-sm text-stone-600 mt-2">
            20 dan ortiq hashamatli va milliy uslubdagi raqamli taklifnomalar
          </p>
        </div>

        <TemplateFilters
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <TemplateGrid
          templates={filteredTemplates}
          loading={loading}
          onPreview={(t) => setPreviewTemplate(t)}
        />

        <PreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
        />
      </div>
    </div>
  )
}
