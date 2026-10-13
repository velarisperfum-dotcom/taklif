import React from 'react'
import { TemplateProps } from './types'
import { UniversalAnimatedTemplate } from './UniversalAnimatedTemplate'

export const CinematicLove: React.FC<TemplateProps> = (props) => {
  return <UniversalAnimatedTemplate {...props} darkTheme={true} customParticleType="gold-sparkles" />
}
