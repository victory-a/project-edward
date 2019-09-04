import React, { Component } from 'react';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';
import Recognition from './components/speechRecognition/speechRecognition'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Recognition />
        {/* <Speech /> */}
        {/* <SignIn /> */}
        {/* <SignUp /> */}
      </div>
    )
  }
}


export default App;
