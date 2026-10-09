import React from 'react'
import { Template } from '../../types/template'
import { TemplateCard } from './TemplateCard'
import { Loader } from '../ui/Loader'

interface TemplateGridProps {
  templates: Template[]
  loading?: boolean
  onPreview: (template: Template) => void
  onSelect?: (template: Template) => void
  selectedTemplateId?: string
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  loading = false,
  onPreview,
  onSelect,
  selectedTemplateId,
}) => {
  if (loading) {
    return <Loader text="Shablonlar yuklanmoqda..." />
  }

  if (templates.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8">
        <p className="text-stone-500 text-sm">Shablonlar topilmadi.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          isSelected={selectedTemplateId === template.id}
          onPreview={onPreview}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
