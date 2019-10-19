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

class Register extends Component {
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

    onSubmit = () => {
        const { name, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert("Passwords don't match")
        } else if (!name) {
            alert("Username cannot be blank")
        } else if (!password) {
            alert("Password cannot be blank")
        } else {
            axios.post('http://localhost:4000/api/register', { name, password })
            .then(response => {
                this.props.onRouteChange("signin");
            })
            .catch(err => this.setState(
                {errorMessage: err.response.data}
            ))
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
                    />
                </div>
                <div className="form-group">
                    <label className="mt-2" htmlFor="password">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        placeholder="Password"
                        onChange={this.onChange}
                        onKeyDown={this.onEnterKey}
                    />
                </div>
                <p >not new?
                    <span
                        className="font-weight-bold pl-2"
                        style={{ cursor: "pointer" }}
                        onClick={() => this.props.onRouteChange("signin")}>
                        Sign in
                    </span>
                </p>
                <p className="text-danger text-center ">{this.state.errorMessage}</p>
                <div className="text-center">
                    <button
                        type="submit"
                        className="btn m-3"
                        onClick={this.onSubmit}
                        style={buttonStyle}>
                        Register
                        </button>
                </div>
            </div>
        )
    }
}

export default Register;