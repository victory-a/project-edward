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

//grab request parameters 

//helper functions
function authenticateUser (name, password) {
    return users.filter(user => user.name.toLowerCase() === name.toLowerCase() && user.password === password)
} 

function getUserIndexByName (name) {
    return users.findIndex(user => user.name === name)
}

// function increaseTranslationCount (name) {
//     const user = users.filter(user => user.name.toLowerCase() === name.toLowerCase())
//     user[0].translationCount++

// }
 
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
app.get('/users', (req, res) => {
    res.send(users)
})

app.post('/translate', (req, res) => {
    const {text, language,} = req.body;
    translate(req, res, text, language);
});

app.post('/register', (req, res) => {
    users.push({
        name: req.body.name,
        password: req.body.password,
        admin: false,
        translationCount: 0,
        joined: new Date()
    });
    res.json(users[users.length - 1]);
});

/* this handler takes the user credentials (name, password)  and authenticates them.
 if the user exists an oobject (user) with  name, translationcount and admin status is sent as the response
*/

app.post('/signin', (req, res) => {
    const { name, password } = req.body;  
    const requestedUser = authenticateUser(name, password);
    if (requestedUser.length) {
        const { name, translationCount, admin} = requestedUser[0]
        const user = { name:name, translationCount:translationCount, admin: admin }
        res.json(user);
    } else {
        res.status(400).json('invalid credentials')
    }    
});

app.delete('/delete/:name', (req, res) => {
    const userName = req.params.name
    const userIndex = getUserIndexByName(userName)
    if (userIndex !== 0 && users[userIndex].admin !== true) {
        users.splice(userIndex, 1);
        res.sendStatus(204)
    }   else {
        res.status(404).send('user not valid or user is an admin')
    }
})

const PORT = process.env.port || 4000 
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});
