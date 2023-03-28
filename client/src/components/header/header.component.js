import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import './header.component.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import MyAccountNavBar from "../myAccountNavBar/myAccountNavBar.component"
import CartService from "../../services/cart.service";


export default function Header(){
    const { cart } = useSelector((state) => state.cart)
    const [cartValue, setCartValue] = useState(0)

    useEffect(()=>{
        if(cart){
            setCartValue(CartService.calCartValue(cart.cart))
        }
    },[cart])

    return(
        <div className="header">
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/" className="logo" active>AUDIO PRO</Navbar.Brand>
                    <Nav className="me-auto header-menu-main">
                        <Nav.Link href="/" active>Home</Nav.Link>
                        <Nav.Link href="/product-category/speaker" active>Speakers</Nav.Link>
                        <Nav.Link href="/product-category/amplifiers" active>Amplifiers</Nav.Link>
                        <Nav.Link href="/product-category/subwoofers" active>Subwoofers</Nav.Link>
                        <Nav.Link href="/product-category/accessories" active>Accessories</Nav.Link>
                        {/* <Nav.Link href="#pricing" active>Blog</Nav.Link> */}
                    </Nav>
                    
                    <Nav className="header-menu-right justify-content-end">
                        <Nav.Link active>
                            <i className="bi bi-search" style={{fontSize:'1rem'}}></i>
                        </Nav.Link>
                        <MyAccountNavBar />                        
                        <Nav.Link active href="/cart">
                            <i className="bi bi-cart2" style={{fontSize:'1rem', marginRight:'12px'}}></i>
                            ${new Intl.NumberFormat().format(cartValue.toFixed(2))}
                            {/* ${cartValue.toFixed(2)} */}
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
