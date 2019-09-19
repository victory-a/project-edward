import React, { Component } from 'react';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Home from './components/Home';
import ViewUsers from './components/ViewUsers';


//REMEMBER TO CHANGE THE NAME STATE VALUE TO AN EMPTY STRING AFTER ADDING ROUTING
class App extends Component {
    constructor(props){
        super(props);
        this.state= {
            name: 'victory',
            translationCount: 0,
            isAdmin: false,
            route: "signin",
            isauthenticated: false
        }
    }

// updates the state with user information
    loadUser = (user) => {
        if(user.hasOwnProperty('name')) {
            this.setState({
                name: user.name,
                translationCount: user.translationCount,
                isAdmin: user.admin,
                isauthenticated: !this.state.isauthenticated
            })
            console.log('user load successful')
        }  else {
            this.setState({errorMessage: 'Invalid username or password'})
        }
    }

    displayError = (error) => {
        console.log("error", error)
        this.setState({ errorMessage: error})
    }

    routeChange = (targetComponent) => {
        if ( this.state.isauthenticated && targetComponent === "Sign in") {
            this.setState({ route: "Home"})
        }
        else if (this.state.isauthenticated && targetComponent === "ViewUsers") {
            this.setState({ route: "ViewUsers"})
        }
        else if (targetComponent === "Register") {
            this.setState({ route: "Register"})
        }
        else {
            this.setState({ route: "SignIn"})
        }
    }

    render() {
        const { errorMessage, name, route } = this.state;
        const components = {
            signin: <SignIn loadUser={this.loadUser} errorMessage={errorMessage} onRouteChange={this.routeChange} /> ,
            register: <Register loadUser={this.loadUser} onRouteChange={this.routeChange}/>,
            home: <Home currentUser={name} onRouteChange={this.routeChange}/>,
            viewusers: <ViewUsers onRouteChange={this.routeChange}/>
        }
    //attach the ononRouteChange method to the right buttons and navlinks
    // configure isauthenticated changing method and figure out where to fix it
        return (
            <>
                {components[route]}
            </>
        )
    }
}


export default App;