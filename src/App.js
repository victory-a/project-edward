import React, { Component } from 'react';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Home from './components/Home';
import ViewUsers from './components/ViewUsers';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            translationCount: 0,
            isAdmin: false,
            route: "signin",
            isauthenticated: false
        }
    }

    // updates the state with user information
    loadUser = (user) => {
        const { name, id, translationCount, admin } = user
        this.setState({
            name,
            id,
            translationCount,
            isAdmin: admin,
            isauthenticated: !this.state.isauthenticated
        })
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

    // displayError = (error) => {
    //     // console.log("error", error)
    //     this.setState({ errorMessage: error })
    // }

    routeChange = (targetComponent) => {
        if (this.state.isauthenticated && targetComponent === "home") {
            this.setState({ route: "home" })
        }
        else if (this.state.isauthenticated && targetComponent === "viewusers") {
            this.setState({ route: "viewusers" })
        }
        else if (targetComponent === "register") {
            this.setState({ route: "register" })
        }
        else {
            this.setState({ route: "signin" })
        }
    }

    render() {
        const { id, route } = this.state;
        const components = {
            signin: <SignIn loadUser={this.loadUser} onRouteChange={this.routeChange} />,
            register: <Register onRouteChange={this.routeChange} />,
            home: <Home id={id} onRouteChange={this.routeChange} onClearUser={this.clearUser} />,
            viewusers: <ViewUsers onRouteChange={this.routeChange} onClearUser={this.clearUser} isUserAdmin={this.state.isAdmin} currentUser={id} />
        }

        return (
            <>
                {components[route]}
            </>
        )
    }
}


export default App;