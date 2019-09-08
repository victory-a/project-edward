import React, { Component } from 'react';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Recognition from './components/speechRecognition';
import Home from './components/Home'

class App extends Component {

    render() {
        return (
            <div>
                <Recognition/>
                {/* <SignIn /> */}
                {/* <Register /> */}
                {/* <Home /> */}
            </div>
        )
    }
}


export default App;
