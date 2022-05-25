import { configureStore } from '@reduxjs/toolkit'
import { roomApi } from './rooms/services/roomApi'

export function makeStore() {
  return configureStore({
    reducer: { [roomApi.reducerPath]: roomApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(roomApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  })
}

const store = makeStore()

export default store
