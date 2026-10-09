import React from 'react'
import { ShareModal } from '../ShareModal'

interface ShareInvitationProps {
  isOpen: boolean
  onClose: () => void
  url: string
  title: string
}

export const ShareInvitation: React.FC<ShareInvitationProps> = (props) => {
  return <ShareModal {...props} />
}
