import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse } from 'reactstrap';
import Cookies from 'universal-cookie';
import items from '../utilities/NavigationItems';

const cookies = new Cookies();

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleLogout(event) {
        cookies.remove('jwt');
        this.props.onLogout();
        event.preventDefault();
    }

    render() {
        let navLinks = items.map((item, index) => {
            if (!item.requiresAuthentication || (item.requiresAuthentication && this.state.authenticated)) {
                return <li key={index}><Link to={item.path} className="nav-link">{item.label}</Link></li>
            }
        });

        return (
            <div>
                <Navbar className="navbar-inverse bg-primary" toggleable>
                    <NavbarToggler right onClick={this.toggle} />
                    <NavbarBrand href="/">Chris Pelletier</NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
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