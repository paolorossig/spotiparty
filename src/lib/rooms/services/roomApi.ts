import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  createRoomResponse,
  getRoomsResponse,
  getSingleRoomResponse,
} from 'types/rooms'

export const roomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/rooms' }),
  tagTypes: ['Room'],
  endpoints: (builder) => ({
    getUserRooms: builder.query<getRoomsResponse, string>({
      query: () => '',
      providesTags: ['Room'],
    }),
    createRoom: builder.mutation<createRoomResponse, FormData>({
      query: (data) => ({
        url: '',
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['Room'],
    }),
    getRoombyId: builder.query<getSingleRoomResponse, string>({
      query: (roomId) => `/${roomId}`,
    }),
  }),
})

export const {
  useGetUserRoomsQuery,
  useCreateRoomMutation,
  useGetRoombyIdQuery,
} = roomApi
