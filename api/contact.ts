/**
 * Função da Vercel: recebe o formulário de contato e envia por e-mail (Resend).
 *
 * Variáveis de ambiente (Vercel › Settings › Environment Variables):
 * - RESEND_API_KEY      chave criada em resend.com
 * - CONTACT_TO_EMAIL    e-mail que recebe as mensagens
 * - CONTACT_FROM_EMAIL  remetente (opcional). Sem domínio próprio no Resend, use o padrão.
 */
import { validateContact, type ContactInput } from '../shared/contact.js'

const DEFAULT_FROM = 'Portfólio <onboarding@resend.dev>'

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  })

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export async function POST(request: Request): Promise<Response> {
  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return json({ ok: false, error: 'invalid_body' }, 400)
  }

  // Campo invisível para pessoas: se vier preenchido, é robô. Responde ok sem enviar.
  if (typeof body.website === 'string' && body.website.trim() !== '') return json({ ok: true })

  const input: ContactInput = {
    email: String(body.email ?? '').trim(),
    subject: String(body.subject ?? '').trim(),
    message: String(body.message ?? '').trim(),
  }

  const errors = validateContact(input)
  if (Object.keys(errors).length > 0) return json({ ok: false, error: 'validation', errors }, 422)

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !to) {
    console.error('Contato: RESEND_API_KEY ou CONTACT_TO_EMAIL não configurados na Vercel.')
    return json({ ok: false, error: 'not_configured' }, 500)
  }

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.5; color: #30201a">
      <p><strong>De:</strong> ${escapeHtml(input.email)}</p>
      <p><strong>Assunto:</strong> ${escapeHtml(input.subject)}</p>
      <hr style="border: 0; border-top: 1px solid #e3d7c5" />
      <p style="white-space: pre-wrap">${escapeHtml(input.message)}</p>
    </div>`

  const text = `De: ${input.email}\nAssunto: ${input.subject}\n\n${input.message}`

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
        to: [to],
        reply_to: input.email,
        subject: `[Portfólio] ${input.subject}`,
        html,
        text,
      }),
    })

    if (!response.ok) {
      console.error('Contato: o Resend recusou o envio.', response.status, await response.text())
      return json({ ok: false, error: 'send_failed' }, 502)
    }
  } catch (error) {
    console.error('Contato: falha ao falar com o Resend.', error)
    return json({ ok: false, error: 'send_failed' }, 502)
  }

  return json({ ok: true })
}
