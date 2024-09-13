const express = require('express');
const mongoose = require('mongoose');
const boardRouter = require('./routes/boardRoutes');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://iaayush07:Zazhef-vidzah-0vymza@atlascluster.uhfhcnc.mongodb.net/');
app.use(cors());
app.use(express.json());

app.use('/api',boardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
