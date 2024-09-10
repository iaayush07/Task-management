import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './../services/boardSlice.js';
// Import other reducers if needed

export const store = configureStore({
    reducer: {
        boards: boardReducer,
    }
});
