const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');

const languageTranslator = new LanguageTranslatorV3({
  version: '2019-07-30',
  iam_apikey: process.env.API_KEY,
  url: 'https://gateway-lon.watsonplatform.net/language-translator/api'
});

async function translate(req, res) {
  const { input, language } = req.body;
  const translateParams = {
    text: input,
    model_id: language
  };
  try {
    const result = await languageTranslator.translate(translateParams);
    console.log('result', result);
    res.json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, data: {}, error });
  }
}

module.exports = translate;
