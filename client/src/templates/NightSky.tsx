import React from 'react'
import { TemplateProps } from './types'
import { UniversalAnimatedTemplate } from './UniversalAnimatedTemplate'

export const NightSky: React.FC<TemplateProps> = (props) => {
  return <UniversalAnimatedTemplate {...props} darkTheme={true} customParticleType="stars" />
}
