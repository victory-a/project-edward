import React, { Component }from 'react';
import { languagesArray, languagesObject } from '../languages'

const buttonStyle = {
    color: "white",
    borderRadius: "0.2em",
    padding: "0.6em"
}

const languages = languagesArray.map((language, index) => 
    <option 
        key={index} 
        value={languagesObject[language]}
        placeholder="Select Language">
            {language}
        </option>
)

class Controls extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            listening: false
        })
    }

    toggleListen = (e) => {
        this.setState({
          listening: !this.state.listening
        })
        // console.log("clicked", e.target)
        if (this.state.listening) {
            e.target.classList.add("btn-danger")
            e.target.classList.remove("btn-primary")
        } else {
            e.target.classList.add("btn-primary")
            e.target.classList.remove("btn-danger")
        }
    }
    
    render () {
        const { onLanguageSelect, selectedLanguage } = this.props
        return (
            <>
                <div className="select_language">
                    <select 
                        value={selectedLanguage}
                        className="custom-select" 
                        onChange={onLanguageSelect}>
                            {languages}
                    </select>
                </div>
                <div className="buttons text-center">
                    <button type="submit" className="btn m-3 btn-danger" style={buttonStyle} onClick={this.toggleListen}>
                        {
                            this.state.listening? 'Stop' : 'Record'
                        }
                    </button>
                    <button type="submit" className="btn m-3 btn-success" style={buttonStyle}>Translate</button>
                </div>
            </>
        )
    } 


}

export default Controls