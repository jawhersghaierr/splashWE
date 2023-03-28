// import { createApi, fetchBaseQuery } from 'lib_ui/@reduxjs-toolkit'
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { apiUrls } from '../../../../env-vars'
import { baseApi } from "shared_lib_ui/services";

const baseUrl = window?._env_?.apiUrls?.configurations;

// export const configurationsApi = createApi({
//     reducerPath: 'configurationsApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: window?._env_?.apiUrls?.configurations,
//         // baseUrl: apiUrls.configurations,
//         prepareHeaders: (headers, { getState }) => {

//             headers.set('Access-Control-Allow-Origin', `*`)
//             headers.set("Access-Control-Allow-Headers", "X-Requested-With")
//             headers.set('Content-Type', `text/plain`)

//             return headers
//         },
//     }),
//     refetchOnFocus: true,
//     refetchOnReconnect: true,
//     keepUnusedDataFor: 1,
export const configurationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getConfigs: builder.query({
      query: () => {
        let url = `${baseUrl}/configs`;
        return {
          url,
          transform: (response, meta, arg) => {
            return { ...JSON.parse(response) };
          },
        };
      },
      transformResponse: (response, meta) => {
        if (meta.response.status == 204)
          return { meta: { status: meta.response.status } };
        return response;
      },
    }),
  }),
});

export const { useGetConfigsQuery } = configurationsApi;
