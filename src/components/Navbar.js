import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
                            <NavLink
                                onClick={() => {
                                    this.props.onRouteChange("home")
                                }}
                                href="#">
                                Home
                        </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                onClick={() => {
                                    this.props.onRouteChange("viewusers")
                                }}
                                href="#">
                                Users
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                onClick={() => {
                                    this.props.onClearUser();
                                    this.props.onRouteChange("signin")
                                }}
                                href="#">
                                Sign out
                        </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavBar;