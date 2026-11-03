import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { buttonClassName, type ButtonVariant } from './buttonClassName'
import styles from './Button.module.css'

type BaseProps = {
  variant?: ButtonVariant
  children: ReactNode
  className?: string
}

export function Button({
  variant = 'primary',
  className,
  children,
  type = 'button',
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClassName(variant, className)} {...rest}>
      <span className={styles.label}>{children}</span>
    </button>
  )
}

type NavButtonProps = Omit<LinkProps, 'className' | 'children'> & {
  active: boolean
  children: ReactNode
  className?: string
}

/**
 * Item de navegação: Button Type=Text em repouso e Type=Primary quando é a página atual
 * (é assim que as variantes do Nav bar foram montadas no Figma).
 */
export function NavButton({ active, children, className, ...rest }: NavButtonProps) {
  return (
    <Link
      className={buttonClassName(active ? 'primary' : 'text', `${styles.onInverse} ${className ?? ''}`)}
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      <span className={styles.label}>{children}</span>
    </Link>
  )
}
