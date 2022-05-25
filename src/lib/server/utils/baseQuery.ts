import type { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'

interface ApiErrorResponse {
  success: false
  error: string
}

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    {
      status?: number
      message: string
    }
  > =>
  async ({ url, method, data, headers }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, headers })
      return { data: result.data.data }
    } catch (axiosError) {
      let err = axiosError as AxiosError<ApiErrorResponse>
      return {
        error: {
          status: err.response?.status,
          message: err.response?.data.error || err.message,
        },
      }
    }
  }
