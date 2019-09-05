const  synth = window.speechSynthesis;

const speak = (textToBeRead) => {
    const utterThis = new SpeechSynthesisUtterance(textToBeRead);
    const voices = synth.getVoices()
    utterThis.voice = voices[5];
    utterThis.pitch = 0.8;
    utterThis.rate = 0.9;
    synth.speak(utterThis)
    console.log('textToBeRead',textToBeRead)
}

export default speak;