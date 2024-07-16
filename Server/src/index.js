const express = require('express');
const mongoose = require('mongoose');
const boardRouter = require('./routes/boardRoutes');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/task-management');
app.use(cors());
app.use(express.json());

app.use('/api',boardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
