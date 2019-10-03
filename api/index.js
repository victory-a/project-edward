const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRoute = require('./routes/users');

require('dotenv').config();
const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/users', usersRoute);

mongoose.set("useUnifiedTopology", true)
mongoose.set("useNewUrlParser", true)
mongoose.connect(process.env.DB_CONNECTION, () => console.log('connected to DB successfully'))

const PORT = process.env.port || 4000
app.listen(PORT, () => console.log(`Now listening on port ${PORT}`))

