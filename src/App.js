import React, { Component } from 'react';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Recognition from './components/speechRecognition';

class App extends Component {
  render() {
    return (
      <div>
        {/* <Recognition/> */}
        {/* <SignIn /> */}
        <Register />
      </div>
    )
  }
}


export default App;
