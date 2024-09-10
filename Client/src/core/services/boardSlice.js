import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  boards: [],
  activeBoardId: null,
  loading: false,
  error: null,
};

// Thunks for async API calls
export const getBoards = createAsyncThunk('boards/getBoards', async () => {
  const response = await axios.get('http://localhost:3000/api/boards');
  return response.data;
});

export const addBoard = createAsyncThunk('boards/addBoard', async (boardData) => {
  const response = await axios.post('http://localhost:3000/api/boards/add', boardData);
  return response.data;
});

export const updateBoard = createAsyncThunk('boards/updateBoard', async ({ boardId, updatedData }) => {
  const response = await axios.put(`http://localhost:3000/api/boards/${boardId}`, updatedData);
  return response.data;
});

export const actionBoard = createAsyncThunk('boards/actionBoard', async ({ boardId, type }) => {
  let actionMethod;
  let urlEndpoint;

  switch (type) {
    case 'clear':
      actionMethod = 'put';
      urlEndpoint = `http://localhost:3000/api/boards/${boardId}/clear`;
      break;
    case 'delete':
      actionMethod = 'delete';
      urlEndpoint = `http://localhost:3000/api/boards/${boardId}/delete`;
      break;
    case 'reset':
      actionMethod = 'delete';
      urlEndpoint = `http://localhost:3000/api/boards`;
      break;
    default:
      throw new Error('Unknown action type');
  }

  const response = await axios({
    method: actionMethod,
    url: urlEndpoint,
  });
  
  return response.data;
});

// Slice
const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setActiveBoard(state, action) {
      state.activeBoardId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.boards = action.payload;
        if (action.payload.length > 0 && !state.activeBoardId) {
          state.activeBoardId = action.payload[0]._id;
        }
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
        state.activeBoardId = action.payload._id;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        const index = state.boards.findIndex(board => board._id === action.payload._id);
        if (index !== -1) {
          state.boards[index] = action.payload;
        }
      })
      .addCase(actionBoard.fulfilled, (state, action) => {
        // Update the board state as needed after an action
        state.boards = action.payload;
      });
  },
});

export const { setActiveBoard } = boardSlice.actions;
export default boardSlice.reducer;
