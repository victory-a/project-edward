import React, { Component } from 'react';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Recognition from './components/speechRecognition';
import Main from './components/Main'

class App extends Component {

    render() {
        return (
            <div>
                {/* <Recognition/> */}
                {/* <SignIn /> */}
                {/* <Register /> */}
                <Main />
            </div>
        )
    }
}


export default App;
