import { baseApi } from "shared_lib_ui/services";

const baseUrl = window?._env_?.apiUrls?.configurations;
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
