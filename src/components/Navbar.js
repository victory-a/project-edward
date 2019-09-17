import React from 'react';
// import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { NavLink } from 'react-router-dom';

 class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
        collapsed: true,
        };
        }
        toggleNavbar() {
            this.setState({
            collapsed: !this.state.collapsed,
            });
            }

  render() {
    const collapsed = this.state.collapsed;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';   
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <span className="navbar-brand" href="#">Edward</span>
                <button onClick={this.toggleNavbar} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className={`${classOne}`} id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/home">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="active" to="/view-users">Users</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" activeClassName="#" to="/">Sign out</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
  }
}

export default NavBar;