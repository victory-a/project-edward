import React, { Component } from 'react';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Home from './components/Home'

//REMEMBER TO CHANGE THE NAME STATE VALUE TO AN EMPTY STRING AFTER ADDING ROUTING
class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            name: 'victory',
            translationCount: 0,
            isAdmin: false
        }
    }

// updates the state with user information
    loadUser = (user) => {
        if(user.hasOwnProperty('name')) {
            this.setState({
                name: user.name,
                translationCount: user.translationCount,
                isAdmin: user.admin,
            })
            console.log('sign in successful')
        }  else {
            this.setState({errorMessage: 'Invalid username or password'})
        }
    }

    displayError = (error) => {
        console.log("error", error)
        this.setState({ errorMessage: error})
    }
    render() {
        return (
            <div>
                {/* <Recognition/> */}
                <SignIn loadUser={this.loadUser} errorMessage={this.state.errorMessage} />
                {/* <Register loadUser={this.loadUser}/> */}
                {/* <Home currentUser={this.state.name}/> */}
            </div>
        )
    }
}


export default App;
