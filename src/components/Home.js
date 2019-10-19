import React, { Component } from 'react';
import axios from 'axios'
import Display from './Display';
import Controls from './Controls';
import Navbar from './Navbar';
import speak from '../helper_functions/speak';

// initializes speech recognition from web speech api
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.continous = true
recognition.interimResults = true
// recognition.lang = 'en-US'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isListening: false,
            input: '',
            output: '',
            language: 'en-de',
        }
    }

    onLanguageSelect = (e) => {
        this.setState({
            language: e.target.value
        })
    }

    // switches the isListening state and starts the dictation process
    toggleListen = () => {
        this.setState({
            isListening: !this.state.isListening
        }, this.dictate)
    }

    //Changes the record button property depending on isListening state value
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
        // console.log('listening', this.state.isListening)

        if (this.state.isListening) {
            recognition.start();
            recognition.onend = () => {
                // console.log('continue listening', this.state.isListening)
                recognition.start();
            }
        } else {
            recognition.stop();
            recognition.onend = () => {
                // console.log("Stopped listening per click")
            }
        }

        recognition.onstart = () => {
            // console.log("Listening!")
        }

        let finalTranscript = '';
        recognition.onresult = (event) => {
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                    this.setState({ input: finalTranscript });
                }
                else {
                    interimTranscript += transcript;
                    console.log('interimTranscript', interimTranscript)
                }
            }
        }
    }

    ///to be translated and target language as arguments
    increaseTranslationCount = (userId) => {
        axios.patch(`http://localhost:4000/api/users/count/${userId}`)
            .then(response => response)
            .catch(err => err)
    }

    // calls the translate function when translate button is pressed passing in the text 
    onTranslate = () => {
        const { id } = this.props
        const { input, output, language } = this.state;
        axios.post('http://localhost:4000/api/users/translate', { input, language })
            .then(res => {
                this.setState({ output: res.data.output.translations[0].translation });
                this.increaseTranslationCount(id)
                setTimeout(speak(output), 2000);
            })
            .catch(err => err)
    }

    render() {
        return (
            <>
                <Navbar
                    onRouteChange={this.props.onRouteChange}
                    onClearUser={this.props.onClearUser}
                />
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