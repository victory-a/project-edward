import React, { Component } from 'react';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Home from './components/Home'

class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            name: 'Victory',
            translationCount: 0,
            isAdmin: false
        }
    }

    loadUser = (user) => {
        if(user.hasOwnProperty('name')) {
            this.setState({
                name: user.name,
                translationCount: user.translationCount,
                isAdmin: user.admin,
            })
        }  else {
            this.setState({errorMessage: 'user not found :)'})
        }
    }

    displayError = (error) => {
        console.log("error", error)
        this.setState({ errorMessage: error
        })
    }
    render() {
        return (
            <div>
                {/* <Recognition/> */}
                {/* <SignIn loadUser={this.loadUser} errorMessage={this.state.errorMessage} /> */}
                {/* <Register /> */}
                <Home currentUser={this.state.name}/>
            </div>
        )
    }
}


export default App;
