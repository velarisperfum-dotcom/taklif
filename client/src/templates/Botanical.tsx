import React from 'react'
import { BotanicalLove } from './BotanicalLove'
import { TemplateProps } from './types'

export const Botanical: React.FC<TemplateProps> = (props) => {
  return <BotanicalLove {...props} />
}
