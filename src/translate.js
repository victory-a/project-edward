// handles the call to the backend api and returns an output 

async function translate(name, inputText, outputLanguage)  {
    try {
        const request = await fetch('http://localhost:4000/translate', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: name,
                    text: inputText,
                    language: outputLanguage
                })
            })
        const response = await request.json()
        console.log(response)
        return (response)
    } catch (err) {
        console.log(err);
    } 
}  

export default translate;