import React from 'react'
import './Header.css'
import {IoWallet} from 'react-icons/io5';

import { Navbar, Container, Nav } from 'react-bootstrap'

export default function Header() {
    return (
        <div>


            <Navbar collapseOnSelect expand="lg" className='navHeaderbg'>
                <Container>
                    <Navbar.Brand href="#"><img src="STAKING_GYZMO_LOGO.png" alt="" width="100%" className='log_herder' /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#" className='Link_nav' >STAKING</Nav.Link>
                            <Nav.Link href="#" className='Link_nav'>DOCS</Nav.Link>
                            <Nav.Link href="#" className='Link_nav'>GYZCON.COM</Nav.Link>

                            <div className="innerdiv_nav">
                            <IoWallet className='icon_Wallets'/>


                            <h6>12 <span>GYZMO</span> </h6>

                            <button className='btn btn-info btn-sm btn_connect'>4541245...1456f475</button>
                            
                            </div>


                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>



        </div>
    )
}
