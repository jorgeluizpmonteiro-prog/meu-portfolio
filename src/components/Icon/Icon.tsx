import type { CSSProperties } from 'react'
import arrowOutward from '../../assets/icons/arrow-outward.svg'
import keyboardArrowDown from '../../assets/icons/keyboard-arrow-down.svg'
import keyboardArrowLeft from '../../assets/icons/keyboard-arrow-left.svg'
import keyboardArrowRight from '../../assets/icons/keyboard-arrow-right.svg'
import keyboardArrowUp from '../../assets/icons/keyboard-arrow-up.svg'
import labProfile from '../../assets/icons/lab-profile.svg'
import linkedin from '../../assets/icons/linkedin.svg'
import modeNight from '../../assets/icons/mode-night.svg'
import wbSunny from '../../assets/icons/wb-sunny.svg'
import styles from './Icon.module.css'

// Os 9 ícones da seção Components › Icon do Figma (24 px base)
const ICONS = {
  'arrow-outward': arrowOutward,
  'keyboard-arrow-down': keyboardArrowDown,
  'keyboard-arrow-left': keyboardArrowLeft,
  'keyboard-arrow-right': keyboardArrowRight,
  'keyboard-arrow-up': keyboardArrowUp,
  'lab-profile': labProfile,
  linkedin,
  'mode-night': modeNight,
  'wb-sunny': wbSunny,
} as const

export type IconName = keyof typeof ICONS

type IconProps = {
  name: IconName
  className?: string
}

/**
 * O SVG original é usado como máscara: o ícone herda a cor do texto (currentColor),
 * então acompanha os tokens icon/* nos temas claro e escuro.
 */
export function Icon({ name, className }: IconProps) {
  const style = { '--icon-src': `url("${ICONS[name]}")` } as CSSProperties
  return <span aria-hidden="true" className={`${styles.icon} ${className ?? ''}`} style={style} />
}
