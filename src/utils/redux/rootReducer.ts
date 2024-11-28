import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/appSlice';



export const rootReducer = combineReducers({
    appSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;