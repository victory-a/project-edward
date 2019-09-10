import React, { Component } from 'react';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Home from './components/Home'

class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            errorMessage: ''
        }
    }

    loadUser = (user) => {
        this.setState({
            name: user.name,
            translationCount: user.translationCount,
            isAdmin: user.admin,
        })
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
                <SignIn 
                    loadUser={this.loadUser} 
                    displayError={this.displayError} 
                    errorMessage={this.state.errorMessage}
                />
                {/* <Register /> */}
                {/* <Home /> */}
            </div>
        )
    }
}


export default App;
