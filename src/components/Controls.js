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

const Controls = ({ onLanguageSelect, selectedLanguage, toggleListen, isListening}) => {
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
                <button type="submit" className="btn m-3 btn-danger" style={buttonStyle} onClick={toggleListen}>
                    {
                        isListening ? 'Stop' : 'Record'
                    }
                </button>
                <button type="submit" className="btn m-3 btn-success" style={buttonStyle}>Translate</button>
            </div>
        </>
    )

}

export default Controls;