import React from 'react';
import {Navbar,NavbarBrand,Nav,NavItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import './header.css';
import logo from '../../assets/logo.png'

const Header = () => {
    return (
        <div className='navigation'> 
            <Navbar style={{backgroundColor: '#D70F64',
                            height: '70px'}}>
                <NavbarBrand href='/' className='mr-auto ml-md-5 brand'>
                    <img src={logo} alt='Logo' width='80px'/>
                </NavbarBrand>
                <Nav className='mr-md-5'>
                    <NavItem>
                        <Link to='/' className='navlink'>Burger Builder</Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/orders' className='navlink'>Orders</Link>
                    </NavItem>
                    <NavItem>
                        <Link to='/login' className='navlink'>Login</Link>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}

export default Header;