import { configureStore } from '@reduxjs/toolkit';
import { gitApi } from './gitApi/gitApi';
import reposInfoReducer from './gitDataSlice/gitDataSlice'
import { getAllLangRepo } from './gitApi/getAllLangRepo';
import selectRepoInfoReducer from './gitDataSlice/repoInfoSlice'

// Глобальный store с запросами к API и Slice с данными
export const store = configureStore({
    reducer : {
        // redux-toolkit запросы к API
        [gitApi.reducerPath] : gitApi.reducer,
        [getAllLangRepo.reducerPath] : getAllLangRepo.reducer,
        // Slice с дынными о репозиториях и языках в конкретном репозитории
        reposInfo : reposInfoReducer,
        selectRepoInfo : selectRepoInfoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(gitApi.middleware, getAllLangRepo.middleware),
})