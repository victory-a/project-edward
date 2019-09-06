import React, { Component } from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Recognition from './components/speechRecognition';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Recognition/>
        {/* <SignIn /> */}
        {/* <SignUp /> */}
      </div>
    )
  }
}


export default App;
