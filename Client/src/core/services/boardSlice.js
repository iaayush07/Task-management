import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    boards: [],
    activeBoardId: null,
};

const boardSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        setBoards: (state, action) => {
            state.boards = action.payload;
        },
        setActiveBoardId: (state, action) => {
            state.activeBoardId = action.payload;
        },
        addBoard: (state, action) => {
            state.boards.push(action.payload);
        },
        updateBoard: (state, action) => {
            const { id, data } = action.payload;
            const index = state.boards.findIndex(board => board._id === id);
            if (index !== -1) {
                state.boards[index] = data;
            }
        },
        deleteBoard: (state, action) => {
            state.boards = state.boards.filter(board => board._id !== action.payload);
        }
    }
});

export const { setBoards, setActiveBoardId, addBoard, updateBoard, deleteBoard } = boardSlice.actions;

export default boardSlice.reducer;
