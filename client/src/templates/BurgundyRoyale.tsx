import React from 'react'
import { TemplateProps } from './types'
import { UniversalAnimatedTemplate } from './UniversalAnimatedTemplate'

export const BurgundyRoyale: React.FC<TemplateProps> = (props) => {
  return <UniversalAnimatedTemplate {...props} darkTheme={true} customParticleType="gold-sparkles" />
}
