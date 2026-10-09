import React from 'react'
import { TemplateProps } from './types'

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

export const TEMPLATE_REGISTRY: Record<string, React.FC<TemplateProps>> = {
  'royal-gold': RoyalGold,
  'black-tie': BlackTie,
  'pearl-elegance': PearlElegance,
  'burgundy-royale': BurgundyRoyale,
  'uzbek-heritage': UzbekHeritage,
  'suzani-romance': SuzaniRomance,
  'oriental-palace': OrientalPalace,
  'silk-road': SilkRoad,
  'minimal-white': MinimalWhite,
  'editorial-magazine': EditorialMagazine,
  'editorial': EditorialMagazine,
  'modern-beige': ModernBeige,
  'monochrome': Monochrome,
  'rose-garden': RoseGarden,
  'botanical-love': BotanicalLove,
  'botanical': BotanicalLove,
  'pastel-dream': PastelDream,
  'watercolor-romance': WatercolorRomance,
  'night-sky': NightSky,
  'cinematic-love': CinematicLove,
  'glass-elegance': GlassElegance,
  'floral-frame': FloralFrame,
}

export function getTemplateComponent(templateId: string): React.FC<TemplateProps> {
  return TEMPLATE_REGISTRY[templateId] || RoyalGold
}
