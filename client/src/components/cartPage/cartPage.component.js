import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../actions/users";
import './cartPage.component.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CartPageRow from "../cartPageRow/cartPageRow.component";
import Container from 'react-bootstrap/Container';
import CartService from "../../services/cart.service";


export default function CartPage(){
    const { message } = useSelector((state) => state.message)
    const { isLoggedIn } = useSelector((state) => state.users)
    const dispatch = useDispatch();
    const[eye,seteye]=useState(true);
    const { cart } = useSelector((state) => state.cart)
    const [cartValue, setCartValue] = useState(0)
    const [toogleUpdate, setToggleUpdate] = useState(false)
    const [isBtnActive, setIsBtnActive] = useState(false)
    const [subtotal, setSubtotal] = useState(0)
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()


    const handleClickUpdateCart = () =>{
        setToggleUpdate(!toogleUpdate)
        console.log("call handle click at parent");
        console.log(toogleUpdate);
    }

    useEffect(()=>{
        if(cart){
            let newSubtotal = CartService.calCartValue(cart.cart)
            setSubtotal(newSubtotal)
            setTotal(newSubtotal)
        }
    },[cart])

    return(
        <>
            {!isLoggedIn && <Navigate to='/my-account'/>}
            { isLoggedIn && (
                <div className="cart_page_container">
                    <h1>CART</h1>
                    <div className="cart_page_content">
                        <div className="cart-detail">
                            <Container fluid>
                                <Row >
                                    <Col lg={8} >Product</Col>
                                    <Col lg={1} >Price</Col>
                                    <Col lg={1} >Quantity</Col>
                                    <Col lg={1} >Subtotal</Col>
                                    <Col lg={1} ></Col>
                                </Row>
                            </Container>
                            {
                                cart?.cart.map(e => <CartPageRow 
                                                        item={e} 
                                                        toogleUpdate={toogleUpdate} 
                                                        user_id={cart.user_id}
                                                        setIsBtnActive = {setIsBtnActive}
                                                        isBtnActive = {isBtnActive}
                                                        cart_id={cart._id}
                                                    />)
                            }
                            <Row className="update-cart-bar">
                                <Col lg={10} >
                                    <a>Coupon: </a>
                                    <input type='text' placeholder="Coupon code"/>
                                    <button>Apply coupon</button>
                                </Col>
                                <Col lg={2}>
                                    <button onClick={() => handleClickUpdateCart()} disabled={isBtnActive?false:true}>Update cart</button>
                                </Col>
                            </Row>
                        </div>
                        <div className="cart-total">
                            <h2>Cart totals</h2>
                            <Row>
                                <Col sm={10}>Subtotal</Col>
                                <Col sm={2}>${new Intl.NumberFormat().format(subtotal.toFixed(2))}</Col>
                            </Row>
                            <Row>
                                <Col sm={10}>Total</Col>
                                <Col sm={2}>${new Intl.NumberFormat().format(total.toFixed(2))}</Col>
                            </Row>
                            <button onClick={()=> navigate("/checkout")}>Proceed to checkout</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}