import { createSlice } from '@reduxjs/toolkit'

import { fetchPortalSummary } from '@/features/portal/portal-thunks'
import type { PortalSummary } from '@/types/portal'

type PortalState = {
  data: PortalSummary | null
  error: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: PortalState = {
  data: null,
  error: null,
  status: 'idle',
}

const portalSlice = createSlice({
  name: 'portal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortalSummary.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPortalSummary.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchPortalSummary.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Unable to load the client portal.'
      })
  },
})

export default portalSlice.reducer
