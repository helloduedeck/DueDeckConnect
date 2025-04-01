import {api} from './api-client';

export const postsApi = api.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => ({
        url: 'posts',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {useGetPostsQuery} = postsApi;
