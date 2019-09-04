import React, { Component }  from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
// recognition.lang = 'en-US'


class Recognition extends Component {
    constructor() {
        super()
        this.state = ({
            listening: false,
            input: '',
            output: '',
            language: 'en-es'
        })
        this.translate = this.translate.bind(this)
    }

    dictate = () => {
        this.setState({listening: true})
    
        let interimResults
        recognition.start();
        recognition.onresult = (event) => {
            const speechToText = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join(' '); 
            console.log(speechToText)
            interimResults = speechToText + ''

            if (event.results[0].isFinal) {
                this.setState({
                    input: interimResults,
                    listening: false
                })
            }
        }
        recognition.onerror = (event) =>{
            this.setState({
                error: event.error
            })
        }
    }

    translate()  {
        try {
            fetch('http://localhost:4000/translate', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    text: this.state.input,
                    language: this.state.language
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('output : ', data)
                this.setState({output: data[0].translation})
            })


        } catch (err) {
            console.log(err);
        } 
    }   

    render () {
        return (
            <div className='body'>
                <div className="words" >
                    <p> {this.state.input}</p>
                    <p> {this.state.output}</p>
                </div>
                <button onClick={this.dictate} className="btn-primary" disabled={this.state.listening}>Listen</button>
                <button onClick={this.translate} className="btn-primary" >Translate</button>
          </div>
        )
    }
}

export default Recognition;