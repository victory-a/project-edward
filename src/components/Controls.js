import React from 'react';
import { languagesArray, languagesObject } from '../data/languages'

const buttonStyle = {
    color: "white",
    padding: "0.6em",
}

const languages = languagesArray.map((language, index) => 
    <option 
        key={index} 
        value={languagesObject[language]}
        placeholder="Select Language">
            {language}
        </option>
)

const Controls = ({onLanguageSelect, selectedLanguage, toggleListen, isListening, renderButton, onTranslate}) => {
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
                <button 
                    type="submit" 
                    className="btn m-3 btn-danger" 
                    style={buttonStyle} 
                    onClick={(e) => {toggleListen(); renderButton(e)}}>
                    {
                        isListening ? 'Stop' : 'Record'
                    }
                </button>
                <button 
                    type="submit" 
                    className="btn m-3 btn-success" 
                    style={buttonStyle}
                    onClick={onTranslate}
                    disabled={isListening}
                >
                    Translate
                </button>
            </div>
        </>
    )

}

export default Controls;