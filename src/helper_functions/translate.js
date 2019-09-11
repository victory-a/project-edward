// handles the call to the backend api and returns an output 

async function translate(currentUser, inputText, outputLanguage) {
    try {
        const request = await fetch('http://localhost:4000/translate', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: inputText,
                language: outputLanguage,
                name: currentUser
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