import type { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import toast from 'react-hot-toast'

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
      code: string
      message: string
    }
  > =>
  async ({ url, method, data, headers }) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`RTK Query: ${method} -> ${baseUrl + url}`)
    }

    try {
      const result = await axios({ url: baseUrl + url, method, data, headers })
      return { data: result.data.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError<ApiErrorResponse>

      const error = {
        code: err.response?.status.toString() || '500',
        message: err.response?.data.error || err.message,
      }

      toast.error(error.message, {
        duration: 3000,
      })

      return { error }
    }
  }
