const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', uploadRoutes);

app.get('/', (req, res) => {
  res.send('Server running...');
});

app.listen(3000,"0.0.0.0", () => {
  console.log('Server running on http://localhost:3000');
});