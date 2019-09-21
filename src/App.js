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

    clearUser = () => {
        this.setState({
            name: "",
            translationCount: 0,
            isAdmin: false,
            route: 'signin',
            isauthenticated: false
        })
    }

    displayError = (error) => {
        console.log("error", error)
        this.setState({ errorMessage: error})
    }

    routeChange = (targetComponent) => {
        if ( this.state.isauthenticated && targetComponent === "home") {
            this.setState({ route: "home"})
        }
        else if (this.state.isauthenticated && targetComponent === "viewusers") {
            this.setState({ route: "viewusers"})
        }
        else if (targetComponent === "register") {
            this.setState({ route: "register"})
        }
        else {
            this.setState({ route: "signin"})
        }
    }

    render() {
        const { errorMessage, name, route } = this.state;
        const components = {
            signin: <SignIn loadUser={this.loadUser} errorMessage={errorMessage} onRouteChange={this.routeChange} /> ,
            register: <Register loadUser={this.loadUser} onRouteChange={this.routeChange}/>,
            home: <Home currentUser={name} onRouteChange={this.routeChange} onClearUser={this.clearUser}/>,
            viewusers: <ViewUsers onRouteChange={this.routeChange} onClearUser={this.clearUser} isUserAdmin={this.state.isAdmin}/>
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