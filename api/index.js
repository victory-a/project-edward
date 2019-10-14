const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');

require('dotenv').config();
const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/', authRoute);
app.use('/api/users', usersRoute);

const dbOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

const uri = process.env.DB_CONNECTION
mongoose.connect(uri, dbOptions)
    .then(() =>console.log('connected to DB'))
    .catch((error) => console.log('Failed to connect to db: ', error));

const PORT = process.env.port || 4000 
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))

       