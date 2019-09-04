const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const users  = require('./users');
const cors = require('cors');
require('dotenv').config();

const app = express();

//middlewares
app.use(bodyParser.json())
app.use(cors());
app.use(morgan('dev'))
// app.use('/translate', (req, res, next) => {
//     const { name, password, text, language} = req.body;
//     next() 
// })

//grab request parameters 

//helper functions
function authenticateUser (name, password) {
    users.filter(user => user.name === name && user.password === password)
} 
 
// translate interface   
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const languageTranslator = new LanguageTranslatorV3({
    version: '2019-07-30',
    iam_apikey: process.env.API_KEY,
    url: 'https://gateway-lon.watsonplatform.net/language-translator/api'
});

async function translate (req, res, textToBeTranslated, targetLanguage) {
    const translateParams = { 
        text: textToBeTranslated,
        model_id: targetLanguage,
    };
    try {
        let response = await languageTranslator.translate(translateParams)
        let result = await response;
        console.log(result);
        res.send(result.translations); 
    } catch (err) {
        console.log('error:', err);
        res.send(err);
    }
}

//route handlers
app.get('/', (req, res) => {
    res.send(users)
})

app.post('/translate', (req, res) => {
    const { text, language } = req.body
    translate(req, res, text, language);
});

app.post('/register', (req, res) => {
    users.push({
        name: req.body.name,
        password: req.body.password,
        joined: new Date()
    });
    res.json(users[users.length - 1]);
});

app.post('/signin', (req, res) => {
    const { name, password } = req.body;
    const requestedUser = authenticateUser(name, password);
    if (requestedUser.length) {
        res.json(requestedUser[0]);
    } else {
        res.status(400).json('invalid credentials')
    }    
});

const PORT = process.env.port || 4000 
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});

