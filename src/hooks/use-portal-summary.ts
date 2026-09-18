import { useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'

import { fetchPortalSummary } from '@/features/portal/portal-thunks'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'

export function usePortalSummary() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const dispatch = useAppDispatch()
  const portal = useAppSelector((state) => state.portal)

  useEffect(() => {
    if (!isLoaded || !isSignedIn || portal.status !== 'idle') {
      return
    }

    const load = async () => {
      const token = await getToken()

      if (!token) {
        return
      }

      await dispatch(fetchPortalSummary({ token }))
    }

    void load()
  }, [dispatch, getToken, isLoaded, isSignedIn, portal.status])

  return portal
}
