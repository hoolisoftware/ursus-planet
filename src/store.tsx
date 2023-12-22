import { configureStore } from '@reduxjs/toolkit'
import tmpReducer from './features/tmp/tmpSlice'

export const store = configureStore({
  reducer: {
    tmp: tmpReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch