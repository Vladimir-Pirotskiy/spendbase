import {configureStore} from "@reduxjs/toolkit";
import {FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE,} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux'
import {slice} from "@/slices/slice.ts";


const persistConfig = {
    key: 'root',
    storage
}
const rootReducer = combineReducers({
    slice: slice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            // @ts-ignore
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
            ]
        }
    })
})

export const persistor = persistStore(store)