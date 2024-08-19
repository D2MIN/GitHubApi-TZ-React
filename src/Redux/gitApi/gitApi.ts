import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Функция redux-toolkit для работы с ассинхронными запросами на API
// Получение всех репозиториев по названию из поиска
export const gitApi = createApi({
    reducerPath : 'api',
    baseQuery : fetchBaseQuery({
        baseUrl : 'https://api.github.com/',
    }),
    endpoints : (builder) => ({
        getRepos: builder.query({
            query: (repo_name: string) => ({
                url: 'search/repositories',
                params: {
                    q: `${repo_name} in:name`,
                },
            }),
        }),


    })
});

export const {useGetReposQuery} = gitApi;