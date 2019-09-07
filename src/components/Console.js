import React, { Component } from 'react';
import Display from './Display';
import Controls from './Controls';

class Console extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedLanguage : 'en-de',
            listening: true
        }
    }
    onLanguageSelect = (e) => {
        this.setstate({
            selectedLanguage: e.target.value 
        })
    }
    render () {
        return (
            <>
                <div className="container mt-5 red-border">
                    <Display />
                    <Controls 
                        onLanguageSelect={this.onLanguageSelect} 
                        selectedLanguage={this.state.selectedLanguage}
                    />
                </div>
            </>
        )
    }
} 

export default Console; 