export interface Template {
  id: string
  name: string
  category: string
  description: string
  previewImage?: string | null
  priceTier: 'FREE' | 'PREMIUM'
  active: boolean
}
