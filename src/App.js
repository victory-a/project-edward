import React, { Component } from 'react';
import Register from './components/Register';
import SignIn from './components/SignIn';
import Home from './components/Home';
import ViewUsers from './components/ViewUsers';
import { BrowserRouter as Router, Route } from 'react-router-dom';


const NestedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        <Component {...props} />
    )} />
)

const ProtectedRoute = ({ render: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        <Component {...props} />
    )} />
)



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
            console.log('user load successful')
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
            <>
                {/* <SignIn loadUser={this.loadUser} errorMessage={this.state.errorMessage} /> */}
                {/* <Register loadUser={this.loadUser} /> */}
                {/* <Home currentUser={this.state.name} /> */}
                {/* <ViewUsers /> */}
                <Router>
                    <Route exact path='/' render={(props) => <SignIn {...props} loadUser={this.loadUser} errorMessage={this.state.errorMessage} />} />
                    <Route path='/register' render={(props) => <Register {...props} loadUser={this.loadUser} />} />
                    <ProtectedRoute path='/home' render={(props) => <Home {...props} currentUser={this.state.name} />} />
                    <NestedRoute path='/view-users'  component={ViewUsers} />
                </Router>
            </>
        )
    }
}


export default App;
