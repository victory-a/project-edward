import React from 'react';
// import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand">Edward</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item ">
                        <Link className="nav-link active" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/view-users">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" to="/">Sign Out</Link>
                    </li>
                </ul>
            </div>
        </nav>
        // <div className="mb2">
        //   <Navbar color="light" light expand="md">
        //     <NavbarBrand href="/" className="pl-4">Edward</NavbarBrand>
        //     <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        //     <Collapse isOpen={!this.state.collapsed} navbar>
        //       <Nav navbar className="ml-auto mr-3">
        //         <NavItem>
        //           <Link to="/home"><NavLink>Home</NavLink></Link>
        //         </NavItem>
        //         <NavItem>
        //           <Link to="/view-users"><NavLink>Users</NavLink></Link>
        //         </NavItem>
        //         <NavItem>
        //           <Link to="/"><NavLink>Sign Out</NavLink></Link>
        //         </NavItem>
        //       </Nav>
        //       </Collapse>
        //   </Navbar>
        // </div>
    );
}

export default NavBar;