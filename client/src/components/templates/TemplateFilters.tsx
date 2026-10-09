import React from 'react'
import { Search } from 'lucide-react'

interface TemplateFiltersProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (cat: string) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  sortBy: string
  onSortChange: (sort: 'popular' | 'name') => void
}

export const TemplateFilters: React.FC<TemplateFiltersProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-4 top-3.5 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Shablon nomi yoki uslubi bo‘yicha qidiring..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-stone-200 text-sm outline-none focus:border-amber-500 bg-stone-50"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-stone-500 font-medium">Saralash:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="py-2 px-3 rounded-xl border border-stone-200 text-xs text-stone-700 bg-stone-50 outline-none cursor-pointer"
          >
            <option value="popular">Tavsiya etilgan</option>
            <option value="name">Nomi bo‘yicha (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2 border-t border-stone-100">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
