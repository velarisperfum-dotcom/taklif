import { Invitation } from '../types'

export interface TemplateProps {
  invitation: Invitation
  isPreview?: boolean
  onRsvpSubmitted?: () => void
}
