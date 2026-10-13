import React from 'react'
import { TemplateProps } from './types'
import { UniversalAnimatedTemplate } from './UniversalAnimatedTemplate'

export const WatercolorRomance: React.FC<TemplateProps> = (props) => {
  return <UniversalAnimatedTemplate {...props} customParticleType="petals" />
}
