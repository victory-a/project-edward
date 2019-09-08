import React, { Component }  from 'react';
import translate from '../translate';
import speak from '../speak'


//speech to text 
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.continous = true
recognition.interimResults = true
// recognition.lang = 'en-US'


class Recognition extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            listening: false,
            input: '',
            output: '',
            language: 'en-es',
        })
    }

    toggleListen = () => {
        this.setState({
          listening: !this.state.listening
        },this.dictate)
    }

    dictate = () => {
        console.log('listening', this.state.listening)
        if (this.state.listening) {
            recognition.start();
            recognition.onend = () => {
                console.log('continue listening', this.state.listening)   
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
                    this.setState({input: finalTranscript});
                }
                else {
                    interimTranscript += transcript;
                    console.log('interimTranscript', interimTranscript)
                }
            }
        }
    }

    onTranslate = () => {
        const { name, input, language } = this.state;
        console.log('input', this.state.input)
        translate(name, input, language)
        .then(response => {
            this.setState({output: response[0].translation})
            setTimeout(speak(response[0].translation), 2000)
        }).catch(err => console.log(err))
    }

    render () {
        return (
            <div className='body'>
                <div className="words" >
                    <p> {this.state.input}</p>
                    <p> {this.state.output}</p>
                </div>
                <button onClick={this.toggleListen} className="btn-primary">{!this.state.listening? 'Start': 'Stop'}</button>
                <button onClick={this.onTranslate} className="btn-primary" >Translate</button>
          </div>
        )
    }
}

export default Recognition;