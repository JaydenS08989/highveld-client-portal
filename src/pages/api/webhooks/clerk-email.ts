import { verifyWebhook } from '@clerk/backend/webhooks'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

type WebhookResponse = {
  message: string
}

type EmailCreatedData = {
  body?: string
  html?: string
  otp_code?: string
  subject?: string
  to_email_address?: string
}

async function readRawBody(req: NextApiRequest) {
  const chunks: Buffer[] = []

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  return Buffer.concat(chunks).toString('utf8')
}

function toHeaders(req: NextApiRequest) {
  const headers = new Headers()

  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      value.forEach((item) => headers.append(key, item))
    } else if (value) {
      headers.set(key, value)
    }
  }

  return headers
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WebhookResponse>,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({ message: 'Method not allowed.' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET

  if (!apiKey || !from || !signingSecret) {
    res.status(500).json({ message: 'Email delivery is not configured.' })
    return
  }

  try {
    const body = await readRawBody(req)
    const request = new Request('https://highveld.local/api/webhooks/clerk-email', {
      body,
      headers: toHeaders(req),
      method: 'POST',
    })

    const event = await verifyWebhook(request, { signingSecret })

    if (event.type !== 'email.created') {
      res.status(200).json({ message: 'Event ignored.' })
      return
    }

    const data = event.data as EmailCreatedData
    const to = data.to_email_address
    const subject = data.subject ?? 'Highveld Advisory verification'
    const html =
      data.body ??
      data.html ??
      (data.otp_code
        ? `<div style="font-family:Arial,sans-serif;color:#0f172a"><h2>Highveld Advisory</h2><p>Your verification code is:</p><p style="font-size:28px;font-weight:700;letter-spacing:6px">${data.otp_code}</p><p>If you did not request this code, you can ignore this email.</p></div>`
        : undefined)

    if (!to || !html) {
      res.status(422).json({ message: 'Email payload is incomplete.' })
      return
    }

    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      html,
      subject,
      to,
    })

    if (error) {
      res.status(502).json({ message: error.message })
      return
    }

    res.status(200).json({ message: 'Email sent.' })
  } catch {
    res.status(400).json({ message: 'Webhook verification failed.' })
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
