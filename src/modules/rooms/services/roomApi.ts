import type { Playlist, Room } from 'types/rooms'
import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from 'modules/rooms/utils'

function providesList<R extends { id: string }[], T extends string>(
  resultsWithIds: R | undefined,
  tagType: T
) {
  return resultsWithIds
    ? [
        { type: tagType, id: 'LIST' },
        ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
      ]
    : [{ type: tagType, id: 'LIST' }]
}

export const roomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/api/rooms' }),
  tagTypes: ['Rooms'],
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getUserRooms: builder.query<Room[], void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
      providesTags: (result) => providesList(result, 'Rooms'),
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
      invalidatesTags: [{ type: 'Rooms', id: 'LIST' }],
    }),
    updateRoom: builder.mutation<Room, Partial<Room>>({
      query: ({ id: roomId, ...data }) => ({
        url: `/${roomId}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Rooms', id }],
    }),
    deleteRoom: builder.mutation<Room, string>({
      query: (roomId) => ({
        url: `/${roomId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Rooms', id }],
    }),
    getRoombyId: builder.query<Room, string>({
      query: (roomId) => ({
        url: `/${roomId}`,
        method: 'GET',
      }),
      providesTags: (result) => [{ type: 'Rooms', id: result?.id }],
    }),
    generatePlaylist: builder.mutation<Playlist, any>({
      query: ({ roomId, ...data }) => ({
        url: `/${roomId}`,
        method: 'POST',
        data,
      }),
      invalidatesTags: (result, error, { roomId: id }) => [
        { type: 'Rooms', id },
      ],
    }),
  }),
})

export const {
  useGetUserRoomsQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useGetRoombyIdQuery,
  useGeneratePlaylistMutation,
} = roomApi
