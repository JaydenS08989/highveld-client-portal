import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { apiClient } from '@/lib/api-client'
import type { PortalSummary } from '@/types/portal'

type FetchPortalSummaryInput = {
  token: string
}

export const fetchPortalSummary = createAsyncThunk<
  PortalSummary,
  FetchPortalSummaryInput,
  { rejectValue: string }
>('portal/fetchSummary', async ({ token }, { rejectWithValue }) => {
  try {
    const response = await apiClient.get<PortalSummary>('/api/portal/summary', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        typeof error.response?.data === 'object' &&
        error.response?.data !== null &&
        'message' in error.response.data &&
        typeof error.response.data.message === 'string'
          ? error.response.data.message
          : 'Unable to load the client portal.'

      return rejectWithValue(message)
    }

    return rejectWithValue('Unable to load the client portal.')
  }
})
