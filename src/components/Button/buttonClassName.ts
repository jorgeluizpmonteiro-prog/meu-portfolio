import styles from './Button.module.css'

/** Variantes do componente Button no Figma (Type=…). Os estados vêm de :hover, :active e :focus-visible. */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'text'

/** Classes do Button, para aplicar o mesmo visual em links. */
export function buttonClassName(variant: ButtonVariant, className?: string) {
  return [styles.button, styles[variant], className].filter(Boolean).join(' ')
}
