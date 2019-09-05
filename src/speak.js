const  synth = window.speechSynthesis;

const speak = (textToBeRead) => {
    const utterThis = new SpeechSynthesisUtterance(textToBeRead);
    const voices = synth.getVoices()
    console.log('voices', voices)
    
    synth.speak(utterThis)
    console.log('textToBeRead',textToBeRead)
}

export default speak;
