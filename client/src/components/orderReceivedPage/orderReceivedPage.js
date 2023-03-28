import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { format } from 'date-fns'
import { login } from "../../actions/users";
import './orderReceivedPage.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CartPageRow from "../cartPageRow/cartPageRow.component";
import Container from 'react-bootstrap/Container';
import CartService from "../../services/cart.service";
import { createOrder } from "../../actions/order";


export default function OrderReceivedPage(){
    const { isLoggedIn } = useSelector((state) => state.users)
    const received_order = JSON.parse(sessionStorage.getItem("received_order"))
    // const { received_order } = useSelector((state) => state.received_order)
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(received_order);
    },[])

    return(
        <>
            {!isLoggedIn && <Navigate to='/my-account'/>}
            { isLoggedIn && (
                <div className="order_received_page_container">
                    <h1>ORDER RECEIVED</h1>
                    <p>Thank you. Your order has been received.</p>
                    <div className="order_info">
                        <div>
                            ORDER NUMBER
                            <br/>
                            <b><a>{received_order._id}</a></b>
                        </div>
                        <div className="div-left-border">
                            DATE
                            <br/>
                            {/* <a>{format(new Date(received_order.created_date),'dd/mm/yyy')}</a> */}
                            <b><a>{received_order.created_date.substring(0,8)}</a></b>
                        </div>
                        <div className="div-left-border">
                            TOTAL
                            <br/>
                            <b><a>${received_order.total}</a></b>
                        </div>
                        <div className="div-left-border">
                            PAYMENT METHOD
                            <br/>
                            <b><a>{received_order.payment_method}</a></b>
                        </div>
                    </div>
                    <div className="order-details">
                        <h3>Order details</h3>
                        <Row>
                            <Col sm={8}><b>Product</b></Col>
                            <Col sm={4}><b>Total</b></Col>
                        </Row>
                        {
                            received_order?.items.map(e => {
                                let itemSubTotal = e.last_price*e.amount
                                return (
                                    <Row>
                                        <Col sm={8}>
                                            {e.product_name.toLowerCase()}&nbsp; &nbsp; &nbsp; <b>x{e.amount}</b> &nbsp; &nbsp; &nbsp;{e.power}
                                        </Col>
                                        <Col sm={4}>${itemSubTotal.toFixed(2)}</Col>
                                    </Row>
                                )
                            })
                        }
                        <Row>
                            <Col sm={8}><b>Subtotal:</b></Col>
                            <Col sm={4}><b>${received_order.subtotal}</b></Col>
                        </Row>
                        <Row>
                            <Col sm={8}><b>Shipping:</b></Col>
                            <Col sm={4}>{received_order.shipping_fee}</Col>
                        </Row>
                        <Row>
                            <Col sm={8}><b>Payment method:</b></Col>
                            <Col sm={4}><b>{received_order.payment_method}</b></Col>
                        </Row>
                        <Row>
                            <Col sm={8}><b>Total:</b></Col>
                            <Col sm={4}><b>${received_order.total}</b></Col>
                        </Row>
                    </div>
                    <div className="billing-address">
                        <h3>Billing address</h3>
                        <div >
                            <a>First name: {received_order.shipping_address.first_name}</a><br />
                            <a>Last name: {received_order.shipping_address.last_name}</a><br />
                            <a>Address: {received_order.shipping_address.address}</a><br />
                            <a>City: {received_order.shipping_address.city}</a><br />
                            <a>Ward: {received_order.shipping_address.ward}</a><br />
                            <a>Zip: {received_order.shipping_address.zip}</a><br />
                            <a>Country: {received_order.shipping_address.country}</a><br />
                            <a>Phone: {received_order.shipping_address.phone}</a><br />
                            <a>Note: {received_order.shipping_address.note}</a><br />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}