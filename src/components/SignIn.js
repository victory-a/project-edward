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
        const { password, name} = this.state;
        if ( !password ) {
            alert("provide a password")
        } else if (!name) {
            alert("Username cannot be blank")
        }
        else {
            console.log('ok')
        }
    }

    render () {
        return ( 
            <div className="container rounded shadow p-3 mb-5 bg-white rounded" style={containerStyle}>
                <h2 className="text-center m-3">Project Edward</h2>
                <div className="form-group">
                    <label className="mt-3" htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        name="name" 
                        className="form-control" 
                        placeholder="Enter name" 
                        onChange={this.onChange}
                        required
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
                        required 
                    />
                </div>
                <p >new here?  <a href="#" >Register</a></p>
                <div className="text-center">
                <button 
                    type="submit" 
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