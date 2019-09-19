import React, { Component } from 'react';

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
    
    onChange = (event) => {
        const { target: { name, value } } = event;
        this.setState({ [name]: value })
    }

    onSubmit = () => {
        try {
            const { name, password } = this.state;
            if ( !password ) {
                alert("Password cannot be blank")
            } else if (!name) {
                alert("Username cannot be blank")
            }
            else {
                fetch('http://localhost:4000/signin', {
                    method: 'post',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: name,
                        password: password
                    })
                })
                .then(response => response.json())
                .then(user => this.props.loadUser(user))
            }

        } catch (err) {
            alert('kidly fill all fields')
        }
    }

    render () {
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
                <p >new here?  <span style={{cursor: "pointer"}}>Register</span></p>
                <p className="text-danger text-center ">{this.props.errorMessage}</p>
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