import React from 'react'
import { TemplateRenderer } from '../../templates'
import { Invitation } from '../../types/invitation'

interface InvitationRendererProps {
  invitation: Invitation
  isPreview?: boolean
  onRsvpSubmitted?: () => void
}

export const InvitationRenderer: React.FC<InvitationRendererProps> = (props) => {
  return <TemplateRenderer {...props} />
}
