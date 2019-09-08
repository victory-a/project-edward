import React, { Component } from 'react';
import Display from './Display';
import Controls from './Controls';

class Main extends Component {
    constructor (props) {
        super(props);
        this.state = ({
            selectedLanguage : 'en-de',
            isListening: false,
            input: '',
            output: ''
        })
    }
    
    onLanguageSelect = (e) => {
        this.setState({
            selectedLanguage: e.target.value 
        })
    }

    toggleListen = (e) => {
        this.setState({
            isListening: !this.state.isListening
        })
        // console.log("clicked", e.target)
        if (this.state.isListening) {
            e.target.classList.add("btn-danger")
            e.target.classList.remove("btn-primary")
        } else {
            e.target.classList.add("btn-primary")
            e.target.classList.remove("btn-danger")
        }
    }

    render () {
        return (
            <>
                <div className="container mt-5 red-border">
                    <Display input={this.state.input} output={this.state.output} />
                    <Controls 
                        onLanguageSelect={this.onLanguageSelect} 
                        selectedLanguage={this.state.selectedLanguage}
                        toggleListen={this.toggleListen}
                        isListening={this.state.isListening}
                    />
                </div>
            </>
        )
    }
} 


export default Main; 