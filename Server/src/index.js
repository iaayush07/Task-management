const express = require('express');
const mongoose = require('mongoose');
const boardRouter = require('./routes/boardRoutes');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/task-management');
app.use(express.json());

// GET API for fetching all boards
app.use(boardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
