import { useState, useEffect } from 'react'
import { Template } from '../types/template'
import { templateService } from '../services/template.service'

export function useTemplates(category?: string) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)
        const data = await templateService.getTemplates(category)
        setTemplates(data)
      } catch (err: any) {
        setError(err.message || 'Xatolik')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [category])

  return { templates, loading, error }
}
