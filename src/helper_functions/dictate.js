const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.continous = true
recognition.interimResults = true

const dictate = (listening, input) => {
    console.log('listening', listening)
    if (listening) {
        recognition.start();
        recognition.onend = () => {
            console.log('continue listening', listening)   
            recognition.start();
        }
    } else {
        recognition.stop();
        recognition.onend = () => {
            console.log("Stopped listening per click")
        }
    }

    recognition.onstart = () => {
        console.log("Listening!")
    }

    let finalTranscript = '';
    recognition.onresult = (event) => {
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript + ' ';
                console.log('recognized language', recognition.lang)
                input= finalTranscript;
            }
            else {
                interimTranscript += transcript;
                console.log('interimTranscript', interimTranscript)
            }
        }
    }
}

export default dictate;