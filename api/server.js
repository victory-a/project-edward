const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

dotenv.config({ path: './config/config.env' });

const translate = require('./controllers/translate');

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/translate', translate);

const PORT = process.env.PORT || 4000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle global unhandled promise rejections
process.on('unhandledRejection', (err, data) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
