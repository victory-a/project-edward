import React from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';


 class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Edward</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
                    <NavLink >Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink >Users</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink >Sign out</NavLink>
                </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
}

export default NavBar;