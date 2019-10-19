import React, { Component } from 'react';
import axios from 'axios';

const containerStyle = {
    width: "35%",
    marginTop: "5%",
    color: "#5323a0"
}
const buttonStyle = {
    background: "#5323A0",
    color: "white",
    borderRadius: "0.5em",
    padding: "0.6em"
}


class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: ''
        }
    }

    onChange = (event) => {
        const { target: { name, value } } = event;
        this.setState({ [name]: value })
    }

    /* this function handles auntentication. Returns the user if found and 
    sends the target destination (component) in an onRouteChange method.
    */
    onSubmit = () => {
        const { name, password } = this.state;
        if (!password) {
            alert("Password cannot be blank")
        } else if (!name) {
            alert("Username cannot be blank")
        }
        else {
            axios.post('http://localhost:4000/api/signin', { name, password })
            .then(response => {
                this.props.loadUser(response.data.user)
                this.props.onRouteChange("home")
            })
            .catch(err => {
                this.setState({errorMessage: err.response.data.message})
            })
        }
    }

    onEnterKey = (e) => {
        if (e.keyCode === 13) {
            this.onSubmit()
        }
    }

    render() {
        return (
            <div className="container rounded shadow p-3 mb-5 bg-white rounded" style={containerStyle}>
                <h2 className="text-center m-3">Edward</h2>
                <div className="form-group">
                    <label className="mt-3" htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter name"
                        onChange={this.onChange}
                    />
                </div>
                <div className="form-group">
                    <label className="mt-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={this.onChange}
                        onKeyDown={this.onEnterKey}
                    />
                </div>
                <p >new here?
                    <span
                        className="font-weight-bold pl-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => this.props.onRouteChange("register")}>
                        Register
                    </span></p>
                <p className="text-danger text-center ">{this.state.errorMessage}</p>
                <div className="text-center">
                    <button type="submit"
                        className="btn m-3"
                        style={buttonStyle}
                        onClick={this.onSubmit}>
                        Sign In
                    </button>
                </div>
            </div>
        )
    }
}

export default SignIn;