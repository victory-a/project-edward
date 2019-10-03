require('dotenv').config();
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const languageTranslator = new LanguageTranslatorV3({
    version: '2019-07-30',
    iam_apikey: process.env.API_KEY,
    url: 'https://gateway-lon.watsonplatform.net/language-translator/api'
});

async function translate(res, textToBeTranslated, targetLanguage) {
    const translateParams = {
        text: textToBeTranslated,
        model_id: targetLanguage,
    };
    try {
        const result = await languageTranslator.translate(translateParams)
        console.log(result);
        res.json(result.translations);
    } catch (err) {
        console.log('error:', err);
        res.json(err);
    }
}

module.exports = translate;