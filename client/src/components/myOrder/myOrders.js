import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { login, updateUserInfo } from "../../actions/users";
import './myOrders.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OrderService from "../../services/order.service";

export default function MyOrders(){

    const { isLoggedIn, user } = useSelector((state) => state.users)
    const { message } = useSelector((state) => state.message)
    const { status } = useSelector((state) => state.status)
    const [myOrders, setMyOrders] = useState([])
    const navigate = useNavigate()

    const handleClickView = (e) =>{
        navigate(`/my-account/view-order/${e.target.value}`)
    }
    
    useEffect(()=>{
        console.log("request get my order");
        const handleGetMyOrders = async () => {
            return await OrderService.findOrderByUserId(user._id)
        }

        if(user){
            handleGetMyOrders().then(res => {
                console.log(res);
                if(res.status){
                    setMyOrders(res.myOrders)
                }
                console.log(res.myOrders);
                console.log(user._id);
            })
        }
    },[])

    return(
        <Container className="myorder-container">
            {!isLoggedIn? (<></>) : (
                <>
                    <Row>
                        <Col sm={3}><b>Order</b></Col>
                        <Col sm={2}><b>Date</b></Col>
                        <Col sm={2}><b>Status</b></Col>
                        <Col sm={3}><b>Total</b></Col>
                        <Col sm={2}><b>Actions</b></Col>
                    </Row>
                    {
                        myOrders?.map(e => {
                            return (
                                <Row key={e._id}>
                                    <Col sm={3}>{e._id}</Col>
                                    <Col sm={2}>{e.created_date.substring(0,10)}</Col>
                                    <Col sm={2}>{e.order_status}</Col>
                                    <Col sm={3}>${new Intl.NumberFormat().format(e.total.toFixed(2))} </Col>
                                    <Col sm={2}>
                                        <button onClick={(e)=>handleClickView(e)} value={e._id}>View</button>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </>
            )}
        </Container>
    )
}
