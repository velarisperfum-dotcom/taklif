import React from 'react'
import { TemplateProps } from './types'

// Import all 20 templates
import { RoyalGold } from './RoyalGold'
import { BlackTie } from './BlackTie'
import { PearlElegance } from './PearlElegance'
import { BurgundyRoyale } from './BurgundyRoyale'
import { UzbekHeritage } from './UzbekHeritage'
import { SuzaniRomance } from './SuzaniRomance'
import { OrientalPalace } from './OrientalPalace'
import { SilkRoad } from './SilkRoad'
import { MinimalWhite } from './MinimalWhite'
import { EditorialMagazine } from './EditorialMagazine'
import { ModernBeige } from './ModernBeige'
import { Monochrome } from './Monochrome'
import { RoseGarden } from './RoseGarden'
import { BotanicalLove } from './BotanicalLove'
import { PastelDream } from './PastelDream'
import { WatercolorRomance } from './WatercolorRomance'
import { NightSky } from './NightSky'
import { CinematicLove } from './CinematicLove'
import { GlassElegance } from './GlassElegance'
import { FloralFrame } from './FloralFrame'
import { PalaceRomance } from './PalaceRomance'

export const TEMPLATE_COMPONENTS: Record<string, React.FC<TemplateProps>> = {
  'palace-romance': PalaceRomance,
  'bekzod-munisa': PalaceRomance,
  'royal-gold': RoyalGold,
  'black-tie': BlackTie,
  'pearl-elegance': PearlElegance,
  'burgundy-royale': BurgundyRoyale,
  'uzbek-heritage': UzbekHeritage,
  'suzani-romance': SuzaniRomance,
  'oriental-palace': PalaceRomance,
  'silk-road': SilkRoad,
  'minimal-white': MinimalWhite,
  'editorial-magazine': EditorialMagazine,
  'modern-beige': ModernBeige,
  'monochrome': Monochrome,
  'rose-garden': RoseGarden,
  'botanical-love': BotanicalLove,
  'pastel-dream': PastelDream,
  'watercolor-romance': WatercolorRomance,
  'night-sky': NightSky,
  'cinematic-love': CinematicLove,
  'glass-elegance': GlassElegance,
  'floral-frame': FloralFrame,
}

export const TemplateRenderer: React.FC<TemplateProps> = (props) => {
  const Component = TEMPLATE_COMPONENTS[props.invitation.templateId] || PalaceRomance
  return <Component {...props} />
}
