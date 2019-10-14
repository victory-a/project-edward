require('dotenv').config();
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const languageTranslator = new LanguageTranslatorV3({
    version: '2019-07-30',
    iam_apikey: process.env.API_KEY,
    url: 'https://gateway-lon.watsonplatform.net/language-translator/api'
});

async function translate(req, res) {
    const { text, language, } = req.body;
    const translateParams = {
        text,
        model_id: language
    };
    try {
        const result = await languageTranslator.translate(translateParams)
        res.json(result.translations);
    } catch (err) {
        res.json(err);
    }
}

module.exports = translate;