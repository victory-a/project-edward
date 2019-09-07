import React from 'react';

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

const Register = () => {  
    return ( 
        <div className="container rounded shadow p-3 mb-5 bg-white rounded" style={containerStyle}>
            <h2 className="text-center m-3">Project Edward</h2>
            <div className="form-group">
                <label className="mt-3" for="username">Username</label>
                <input type="text" className="form-control" placeholder="Enter name" />
            </div>
            <div className="form-group">
                <label className="mt-2" for="password">Password</label>
                <input type="password" className="form-control" placeholder="Password" />
            </div>
            <div className="form-group">
                <label className="mt-2" for="password">Confirm Password</label>
                <input type="password" className="form-control" placeholder="Password" />
            </div>
            <p >not new?  <a href="#" >Sign in</a></p>
            <div className="text-center">
            <button type="submit" className="btn m-3" style={buttonStyle}>Submit</button>
            </div>
        </div> 
    )
}

export default Register;