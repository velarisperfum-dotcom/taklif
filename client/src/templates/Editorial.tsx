import React from 'react'
import { EditorialMagazine } from './EditorialMagazine'
import { TemplateProps } from './types'

export const Editorial: React.FC<TemplateProps> = (props) => {
  return <EditorialMagazine {...props} />
}
