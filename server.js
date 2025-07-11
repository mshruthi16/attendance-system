const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const classRoutes = require('./routes/classRoutes');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use('/api', classRoutes);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
