import React, { Component } from "react";

import {
    Nav,
    NavItem,
    NavLink,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Container,
    Collapse
} from "reactstrap";

class AppNavbar extends Component {
    // Component level state - toggles hamburger on Navbar
    state = {
        isOpen: false
    };
    // toggles collapse
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <div className="app-navbar">
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand>Emslie Checkin App</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink>Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>Check-in</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>Locations</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default AppNavbar;
