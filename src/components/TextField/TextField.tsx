import { useLayoutEffect, useRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import styles from './TextField.module.css'

type CommonProps = {
  id: string
  label: string
  /** Mensagem de erro exibida abaixo do campo e ligada a ele para leitores de tela. */
  error?: string
}

type SingleLineProps = CommonProps & { multiline?: false } & Omit<InputHTMLAttributes<HTMLInputElement>, 'id'>
type MultiLineProps = CommonProps & { multiline: true } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>

/**
 * Input — Figma: Components › Input (Default, Hover, Filled, Focus).
 * Rótulo sempre visível e ligado ao campo. Erro: borda e texto em danger (proposta do handoff).
 * Com `multiline`, o campo começa com a mesma altura do Input e cresce conforme o texto.
 */
export function TextField(props: SingleLineProps | MultiLineProps) {
  const { id, label, error } = props
  const errorId = `${id}-erro`
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const value = props.value

  // Ajusta a altura do campo de várias linhas ao conteúdo
  useLayoutEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight + el.offsetHeight - el.clientHeight}px`
  }, [value])

  const shared = {
    id,
    className: `${styles.field} ${props.multiline ? styles.multiline : ''}`,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
  }

  return (
    <div className={`${styles.root} ${error ? styles.invalid : ''}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {props.multiline ? (
        <textarea
          ref={textareaRef}
          rows={1}
          {...withoutCustom(props)}
          {...shared}
        />
      ) : (
        <input {...withoutCustom(props)} {...shared} />
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}

// Remove as props próprias do componente antes de repassar ao elemento nativo
function withoutCustom<T extends CommonProps & { multiline?: boolean }>(props: T) {
  const { id: _id, label: _label, error: _error, multiline: _multiline, ...rest } = props
  return rest
}
