import { clerkClient, getAuth } from '@clerk/nextjs/server'
import type { NextApiRequest, NextApiResponse } from 'next'

import type { PortalSummary } from '@/types/portal'

type ErrorResponse = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PortalSummary | ErrorResponse>,
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({ message: 'Method not allowed.' })
    return
  }

  const { isAuthenticated, userId } = getAuth(req)

  if (!isAuthenticated || !userId) {
    res.status(401).json({ message: 'Authentication required.' })
    return
  }

  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  const clientName =
    user.fullName ?? user.firstName ?? user.primaryEmailAddress?.emailAddress ?? 'Highveld Client'

  res.status(200).json({
    clientName,
    openRequests: 3,
    unreadMessages: 2,
    availableDocuments: 14,
  })
}
