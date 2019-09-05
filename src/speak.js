const  synth = window.speechSynthesis;

const speak = (textToBeRead) => {
    const utterThis = new SpeechSynthesisUtterance(textToBeRead);
    synth.speak(utterThis)
    console.log('textToBeRead',textToBeRead)
}

export default speak;