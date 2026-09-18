import { getAuth } from '@clerk/nextjs/server'
import type { NextApiRequest, NextApiResponse } from 'next'

import type { PortalSummary } from '@/types/portal'

type ErrorResponse = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<PortalSummary | ErrorResponse>) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    res.status(405).json({ message: 'Method not allowed.' })
    return
  }

  const { isAuthenticated } = getAuth(req)

  if (!isAuthenticated) {
    res.status(401).json({ message: 'Authentication required.' })
    return
  }

  res.status(200).json({
    clientName: 'Highveld Client',
    openRequests: 3,
    unreadMessages: 2,
    availableDocuments: 14,
  })
}
