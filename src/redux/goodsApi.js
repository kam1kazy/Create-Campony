import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (build) => ({
    getGoods: build.query({
      query: (active = '') => `goods${active && `?active=${active}`}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Products', id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    updateProduct: build.mutation({
      query: ({ id, patch }) => ({
        url: `goods/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
})

export const { useGetGoodsQuery, useUpdateProductMutation } = goodsApi
