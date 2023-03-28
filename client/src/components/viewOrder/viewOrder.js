import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { format } from 'date-fns'
import { login } from "../../actions/users";
import './viewOrder.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CartPageRow from "../cartPageRow/cartPageRow.component";
import Container from 'react-bootstrap/Container';
import CartService from "../../services/cart.service";
import OrderService from "../../services/order.service";
import { createOrder } from "../../actions/order";


export default function ViewOrder(){
    const params = useParams()
    let order_id  = params.order_id
    const { isLoggedIn, user } = useSelector((state) => state.users)
    let [order, setOrder] = useState({})
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log(order_id);
        const handleGetOrder = async () => {
            return await OrderService.findOrderByOrderId(order_id)
        }

        if(user){
            handleGetOrder().then(res => {
                console.log(res);
                if(res.status){
                    setOrder(res.order)
                }
            })
        }
    },[])

    return(
        <>
            {!isLoggedIn && <Navigate to='/my-account'/>}
            { isLoggedIn && (
                <div className="order_received_page_container">
                    <p>Order is currently Processing.</p>
                    <div className="order_info">
                        <div>
                            ORDER NUMBER
                            <br/>
                            <b><a>{order._id}</a></b>
                        </div>
                        <div className="div-left-border">
                            DATE
                            <br/>
                            <b><a>{order.created_date?.substring(0,10)}</a></b>
                        </div>
                        <div className="div-left-border">
                            TOTAL
                            <br/>
                            <b><a>${order.total}</a></b>
                        </div>
                        <div className="div-left-border">
                            PAYMENT METHOD
                            <br/>
                            <b><a>{order.payment_method}</a></b>
                        </div>
                    </div>
                    <div className="order-details">
                        <h3>Order details</h3>
                        <Row>
                            <Col sm={8}><b>Product</b></Col>
                            <Col sm={4}><b>Total</b></Col>
                        </Row>
                        {
                            order.items?.map(e => {
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
                            <Col sm={4}><b>${order?.subtotal}</b></Col>
                        </Row>
                        <Row>
                            <Col sm={8}><b>Shipping:</b></Col>
                            <Col sm={4}>{order?.shipping_fee}</Col>
                        </Row>
                        <Row>
                            <Col sm={8}><b>Payment method:</b></Col>
                            <Col sm={4}><b>{order?.payment_method}</b></Col>
                        </Row>
                        <Row>
                            <Col sm={8}><b>Total:</b></Col>
                            <Col sm={4}><b>${order?.total}</b></Col>
                        </Row>
                    </div>
                    <div className="billing-address">
                        <h3>Billing address</h3>
                        <div >
                            <a>Name: {order.shipping_address?.first_name} {order.shipping_address?.last_name}</a><br />
                            <a>Address: {order.shipping_address?.address}</a><br />
                            <a>City: {order.shipping_address?.city}</a><br />
                            <a>Ward: {order.shipping_address?.ward}</a><br />
                            <a>Country: {order.shipping_address?.country}</a><br />
                            <a>Phone: {order.shipping_address?.phone}</a><br />
                            <a>Note: {order.shipping_address?.note}</a><br />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}