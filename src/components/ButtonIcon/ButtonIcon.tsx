import { useEffect, useState, type MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from '../Icon/Icon'
import styles from './ButtonIcon.module.css'

type CommonProps = {
  icon: IconName
  /** Texto do tooltip. Também é o nome acessível do botão. */
  label: string
  /** Nome acessível mais completo, quando o tooltip é curto (deve começar pelo tooltip). */
  accessibleLabel?: string
  hasTooltip?: boolean
  className?: string
}

type AsButton = CommonProps & {
  href?: undefined
  to?: undefined
  onClick?: MouseEventHandler<HTMLButtonElement>
}

/** Rota interna do site (usa o roteador, sem recarregar a página). */
type AsRoute = CommonProps & {
  to: string
  href?: undefined
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

type AsLink = CommonProps & {
  href: string
  to?: undefined
  external?: boolean
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

/** Button icon — Figma: Components › Button icon (Default, Hover com tooltip, Pressed, Focus). */
export function ButtonIcon(props: AsButton | AsLink | AsRoute) {
  const { icon, label, accessibleLabel, hasTooltip = true, className } = props
  // Esc esconde o tooltip até o ponteiro sair ou o foco mudar
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!hasTooltip) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDismissed(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hasTooltip])

  const reset = () => setDismissed(false)
  const classes = [styles.root, dismissed && styles.dismissed, className].filter(Boolean).join(' ')
  const content = (
    <>
      <Icon name={icon} className={styles.icon} />
      {hasTooltip && (
        <span className={styles.tooltip} aria-hidden="true">
          {label}
        </span>
      )}
    </>
  )

  if (props.to !== undefined) {
    return (
      <Link
        className={classes}
        to={props.to}
        aria-label={accessibleLabel ?? label}
        onClick={props.onClick}
        onMouseLeave={reset}
        onBlur={reset}
      >
        {content}
      </Link>
    )
  }

  if (props.href !== undefined) {
    return (
      <a
        className={classes}
        href={props.href}
        aria-label={accessibleLabel ?? label}
        onClick={props.onClick}
        onMouseLeave={reset}
        onBlur={reset}
        {...(props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      aria-label={accessibleLabel ?? label}
      onClick={props.onClick}
      onMouseLeave={reset}
      onBlur={reset}
    >
      {content}
    </button>
  )
}
