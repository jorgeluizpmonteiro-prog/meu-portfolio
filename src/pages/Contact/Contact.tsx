import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { CONTACT_LIMITS, validateContact, type ContactErrors, type ContactInput } from '../../../shared/contact'
import { Button } from '../../components/Button/Button'
import { TextField } from '../../components/TextField/TextField'
import { site } from '../../config/site'
import styles from './Contact.module.css'

type Status = 'idle' | 'sending' | 'success' | 'failure'

const EMPTY: ContactInput = { email: '', subject: '', message: '' }
const FIELD_ORDER: (keyof ContactInput)[] = ['email', 'subject', 'message']

/** P.04 — Contato (“Vamos conversar!”). Figma: node 106:8148. */
export function Contact() {
  const [values, setValues] = useState<ContactInput>(EMPTY)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [honeypot, setHoneypot] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)

  const update = (field: keyof ContactInput) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    // Ao corrigir, o erro do campo some
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }))
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return

    const found = validateContact(values)
    setErrors(found)
    const firstInvalid = FIELD_ORDER.find((f) => found[f])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#contato-${firstInvalid}`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website: honeypot }),
      })
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; errors?: ContactErrors }
      if (response.ok && result.ok) {
        setStatus('success')
        setValues(EMPTY)
        requestAnimationFrame(() => successRef.current?.focus())
      } else if (response.status === 422 && result.errors) {
        setErrors(result.errors)
        setStatus('idle')
      } else {
        setStatus('failure')
      }
    } catch {
      setStatus('failure')
    }
  }

  return (
    <main id="conteudo" className={styles.main}>
      <h1 className={styles.title}>Vamos conversar!</h1>

      <div className={styles.card}>
        {status === 'success' ? (
          <div className={styles.success} role="status">
            <h2 ref={successRef} tabIndex={-1} className={styles.successTitle}>
              Mensagem enviada!
            </h2>
            <p className={styles.successText}>Obrigado pelo contato. Vou responder no e-mail que você informou.</p>
            <Button variant="secondary" className={styles.submit} onClick={() => setStatus('idle')}>
              Enviar outra mensagem
            </Button>
          </div>
        ) : (
          <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate>
            {status === 'failure' && (
              <p className={styles.alert} role="alert">
                Não foi possível enviar agora. Tente de novo em instantes ou fale comigo pelo{' '}
                <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                .
              </p>
            )}

            <div className={styles.fields}>
              <TextField
                id="contato-email"
                label="E-mail"
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="Escreva seu e-mail"
                required
                maxLength={CONTACT_LIMITS.email}
                value={values.email}
                onChange={update('email')}
                error={errors.email}
              />
              <TextField
                id="contato-subject"
                label="Assunto"
                name="subject"
                placeholder="Sobre o que você quer conversar?"
                required
                maxLength={CONTACT_LIMITS.subject}
                value={values.subject}
                onChange={update('subject')}
                error={errors.subject}
              />
              <TextField
                id="contato-message"
                label="Sua mensagem"
                name="message"
                multiline
                placeholder="Escreva sua mensagem"
                required
                maxLength={CONTACT_LIMITS.message}
                value={values.message}
                onChange={update('message')}
                error={errors.message}
              />
            </div>

            {/* Campo escondido de pessoas; robôs costumam preenchê-lo */}
            <div className={styles.honeypot} aria-hidden="true">
              <label htmlFor="contato-website">Site</label>
              <input
                id="contato-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <Button type="submit" className={styles.submit} disabled={status === 'sending'} aria-disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
            </Button>
            <p className="visually-hidden" aria-live="polite">
              {status === 'sending' ? 'Enviando mensagem…' : ''}
            </p>
          </form>
        )}
      </div>
    </main>
  )
}
