const express = require('express');
const countriesRouter = require('./routes/countries');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/countries', countriesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});