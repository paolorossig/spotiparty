import type { Playlist, Room } from 'types/rooms'
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from 'lib/server/utils'

export const roomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/api/rooms' }),
  tagTypes: ['Room'],
  endpoints: (builder) => ({
    getUserRooms: builder.query<Room[], string>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: ['Room'],
    }),
    createRoom: builder.mutation<Room, FormData>({
      query: (data) => ({
        url: '',
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ['Room'],
    }),
    getRoombyId: builder.query<Room, string>({
      query: (roomId) => ({
        url: `/${roomId}`,
        method: 'GET',
      }),
    }),
    generatePlaylist: builder.mutation<Playlist, any>({
      query: ({ roomId, ...rest }) => ({
        url: `/${roomId}`,
        method: 'POST',
        data: { ...rest },
      }),
    }),
  }),
})

export const {
  useGetUserRoomsQuery,
  useCreateRoomMutation,
  useGetRoombyIdQuery,
  useGeneratePlaylistMutation,
} = roomApi
