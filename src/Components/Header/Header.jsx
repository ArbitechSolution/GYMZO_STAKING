import React,{useState,useEffect} from 'react'
import './Header.css'
import { IoWalletSharp } from 'react-icons/io5';
import { loadWeb3 } from '../../apis/api'


import { Navbar, Container, Nav } from 'react-bootstrap'

export default function Header({balance}) {

    const [accoutadd, setaccoutadd] = useState("Connect")
    let MainAddress
    const get = async () => {

        MainAddress = await loadWeb3()
        let acc = MainAddress.substring(0, 6) + "..." + MainAddress.substring(MainAddress.length - 6)
        setaccoutadd(acc);


    }

    useEffect(() => {
    get();
})
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
                                <IoWalletSharp className='icon_Wallets' />


                                <h6>{parseInt(balance)} <span>GYZMO</span> </h6>

                                <button className='btn btn-info btn-sm btn_connect'>{accoutadd}</button>

                            </div>


                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>



        </div>
    )
}
