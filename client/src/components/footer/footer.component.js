import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import './footer.component.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

export default function Footer(){

    return(
        <div className="footer">
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home" className="logo" active>AUDIO PRO</Navbar.Brand>
                    <Nav className="me-auto footer-menu-main">
                        <Nav.Link href="#home" active>Our Story</Nav.Link>
                        <Nav.Link href="#features" active>Privacy Policy</Nav.Link>
                        <Nav.Link href="#pricing" active>Terms & Conditions</Nav.Link>
                        <Nav.Link href="#pricing" active>Contact</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
