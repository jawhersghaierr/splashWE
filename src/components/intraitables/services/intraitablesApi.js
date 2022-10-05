import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { env_IP, ports } from '../../../../env-vars'

export const intraitablesApi = createApi({
    reducerPath: 'intraitablesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${env_IP}:${ports.intraitables}/api/v1`,
        prepareHeaders: (headers, { getState }) => {

            headers.set('Access-Control-Allow-Origin', `*`)
            headers.set("Access-Control-Allow-Headers", "X-Requested-With")
            headers.set('Content-Type', `text/plain`)

            return headers
        },
    }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    keepUnusedDataFor: 1,

    endpoints: (builder) => ({

        getIntraitables: builder.query({
            query: ({currentPage, criterias, sortProperties}) => {
                let { periodFrom, periodTo} = criterias;

                const {
                    sortDirection,
                    sortProperty,
                } = sortProperties;

                if (periodFrom && periodFrom != '' && periodFrom != undefined) {
                    periodFrom = new Date(periodFrom).toLocaleDateString('sv');
                }
                if (periodTo && periodTo != '' && periodTo != undefined) {
                    periodTo = new Date(periodTo).toLocaleDateString('sv');
                }

                const size = 20;
                let url = `untreatable/files?pageNumber=${currentPage}&pageSize=${size}`;

                if (sortDirection) url += `&sortDirection=${sortDirection}`;
                if (sortProperty) url += `&sortProperty=${sortProperty}`;
                if (periodFrom) url += `&periodFrom=${periodFrom}`;
                if (periodTo) url += `&periodTo=${periodTo}`;

                console.log('params to be send > ', url);
                return ({url, transform: response => {
                        console.log('response >> ', response);
                        return response;
                    }})
            },
            transformResponse: (response, meta, arg) => {
                response?.data?.forEach(el=>el.id = el.fileId)
                return response;
            }
        }),

        getIntraitablesById: builder.query({
            query: (id) => {
                let url = `untreatable/files/${id}`;
                return ({
                    url,
                    transform: (response, meta, arg) => {
                        return {...JSON.parse(response)};
                    }
                })
            },
        }),

    }),
})
export const {
    useGetIntraitablesQuery,
    useGetIntraitablesByIdQuery,
} = intraitablesApi

/*


const api = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    reportExcel: builder.mutation<any, IReportExcelQuery>({
      query(args) {
        return {
          url: `/admin/api/v3/hso/loans/download`,
          method: "POST",
          body: args.dataset,
          responseHandler: async (response) => window.location.assign(window.URL.createObjectURL(await response.blob())),
          cache: "no-cache",
        };
      },
    }),
  }),
  overrideExisting: false,
});








import { apiSlice } from '../../api/apiSlice';
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const pdfsSlice = apiSlice.injectEndpoints({
    baseQuery: fetchBaseQuery({ baseUrl: '/ ' }),
    endpoints: builder => ({
        downloadPDFFile: builder.mutation({
            queryFn: async ({ setupId, name }, api, extraOptions, baseQuery) => {
                const result = await baseQuery({
                    url: `/setups/${setupId}/file`,
                    responseHandler: ((response) => response.blob())
                })
                var hiddenElement = document.createElement('a');
                var url = window.URL || window.webkitURL;
                var blobPDF = url.createObjectURL(result.data);
                hiddenElement.href = blobPDF;
                hiddenElement.target = '_blank';
                hiddenElement.download = `${name}_report.pdf`;
                hiddenElement.click();
                return { data: null }
            }
        })
    })
})

export const {
    useDownloadPDFFileMutation
} = pdfsSlice;


 */
