import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Функция redux-toolkit для работы с ассинхронными запросами на API
// Получение всех языков использованых в репозитории
export const getAllLangRepo = createApi({
    reducerPath : 'getAllLang',
    baseQuery : fetchBaseQuery({
        baseUrl : 'https://api.github.com/',
    }),
    endpoints : (builder) => ({
        getAllLang: builder.query({
            query: ({ repo_user, repo_name }) => ({
                url: `repos/${repo_user}/${repo_name}/languages`,
            }),
        }),


    })
});

export const {useGetAllLangQuery} = getAllLangRepo;