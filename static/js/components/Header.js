import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse } from 'reactstrap';
import items from '../utilities/NavigationItems';

class Header extends Component {
    handleLogout(event) {
        this.props.onLogout();
        event.preventDefault();
    }

    render() {
        let navLinks = items.map((item, index) => {
            if (!item.requiresAuthentication || (item.requiresAuthentication && this.props.authenticated)) {
                return <li key={index}><Link to={item.path} className="nav-link">{item.label}</Link></li>
            }
        });

        return (
            <div>
                <Navbar className="navbar-inverse bg-primary" toggleable>
                    <NavbarToggler right onClick={this.props.onToggleMenu} />
                    <NavbarBrand href="/">Chris Pelletier</NavbarBrand>
                    <Collapse isOpen={this.props.menuIsOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {navLinks}
                            {
                                this.props.authenticated ?
                                    <li><a href="" className="nav-link" onClick={this.handleLogout.bind(this)}>Logout</a></li> :
                                    <li><Link to="/login" className="nav-link">Login</Link></li>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default Header;