/**
 * Regras do formulário de contato, usadas no navegador e na função /api/contact.
 */
export type ContactInput = {
  email: string
  subject: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>

export const CONTACT_LIMITS = {
  email: 254,
  subject: 150,
  message: 5000,
} as const

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {}
  const email = input.email.trim()
  const subject = input.subject.trim()
  const message = input.message.trim()

  if (!email) errors.email = 'Escreva seu e-mail.'
  else if (!EMAIL_PATTERN.test(email) || email.length > CONTACT_LIMITS.email)
    errors.email = 'Digite um e-mail válido, como nome@exemplo.com.'

  if (!subject) errors.subject = 'Escreva o assunto.'
  else if (subject.length > CONTACT_LIMITS.subject)
    errors.subject = `Use no máximo ${CONTACT_LIMITS.subject} caracteres.`

  if (!message) errors.message = 'Escreva sua mensagem.'
  else if (message.length > CONTACT_LIMITS.message)
    errors.message = `Use no máximo ${CONTACT_LIMITS.message} caracteres.`

  return errors
}
