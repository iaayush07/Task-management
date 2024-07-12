const express = require('express');
const mongoose = require('mongoose');
const boardRouter = require('./routes/boardRoutes');
const cors = require('cors');
const Board = require('./models/board')

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/task-management');
app.use(cors());
app.use(express.json());

// GET API for fetching all boards
app.use(boardRouter);

app.post('/api/boards/add', async (req, res) => {
  try {
    const { name, columns } = req.body;
    const newBoard = new Board({ name, columns });
    await newBoard.save();
    console.log(newBoard);
  } catch (error) {
    console.log(error);;
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
