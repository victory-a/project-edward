import React, { Component } from 'react';
import Display from './Display';
import Controls from './Controls';
import Navbar from './Navbar';
import translate from '../helper_functions/translate';
import speak from '../helper_functions/speak';


// initializes speech recognition from web spwwch api
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.continous = true
recognition.interimResults = true
// recognition.lang = 'en-US'


class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isListening: false,
            input: '',
            output: '',
            selectedLanguage : 'en-de',
        }
    }
    
    onLanguageSelect = (e) => {
        this.setState({
            selectedLanguage: e.target.value 
        })
    }

// switches the isListening state and starts the dictation process
    toggleListen = () => {
        this.setState({
            isListening: !this.state.isListening
        },this.dictate)
    }

//changes the record button property depending on isListening state value
    renderButton = (e) => {
        if (this.state.isListening) {
            e.target.classList.add("btn-danger")
            e.target.classList.remove("btn-primary")
        } else {
            e.target.classList.add("btn-primary")
            e.target.classList.remove("btn-danger")
        }
    }


// handler for starting the voice recognition, outputs the final result to the input state
// ensures the microphone stays on till te user manually stops recording

    dictate = () => {
        console.log('listening', this.state.isListening)

        if (this.state.isListening) {
            recognition.start();
            recognition.onend = () => {
                console.log('continue listening', this.state.isListening)   
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
                    this.setState({input: finalTranscript});
                }
                else {
                    interimTranscript += transcript;
                    console.log('interimTranscript', interimTranscript)
                }
            }
        }
    }


// calls the translate function when translate button is pressed passing in the text 
///to be translated and target language as arguments

    onTranslate = () => {
        const { currentUser } = this.props
        const {input, selectedLanguage } = this.state;
        // console.log('input', this.state.input)
        translate(currentUser, input, selectedLanguage)
        .then(response => {
            this.setState({output: response[0].translation})
            setTimeout(speak(response[0].translation), 2000)
        }).catch(err => console.log(err))
    }


    render () {
        return (
            <>
                <Navbar />
                <div className="container mt-5 red-border">
                    <Display input={this.state.input} output={this.state.output} />
                    <Controls 
                        onLanguageSelect={this.onLanguageSelect} 
                        selectedLanguage={this.state.selectedLanguage}
                        toggleListen={this.toggleListen}
                        renderButton={this.renderButton}
                        isListening={this.state.isListening}
                        onTranslate={this.onTranslate}
                    />
                </div>
            </>
        )
    }
} 


export default Home; 