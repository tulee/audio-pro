import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { login } from "../../actions/users";
import './myAccountPage.component.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyDashBoard from "../myDashboard/myDashboard.component";
import { findCartByUserId } from "../../actions/cart";

export default function MyAccountPage(){

    const { isLoggedIn, user } = useSelector((state) => state.users)
    const dispatch = useDispatch();

    useEffect(()=>{
        if(isLoggedIn){
            const handleFetchCart = async () => {
              await dispatch(findCartByUserId(user._id))
            }
            handleFetchCart()
              .then(() => {
      
              })
              .catch(() => {});
          }
    },[])

    return(
        <>
            {!isLoggedIn && <Navigate to='/login'/>}
            { isLoggedIn && 
            (
                <div className="my-account-container">
                    <h1 className="page-name">MY ACCOUNT</h1>
                    <div className="my-account-body">
                        <Row>
                            <Col sm={3} className="my-account-left">
                                <Nav defaultActiveKey="/my-account" className="flex-column left-nav-bar">
                                    <Nav.Link href="/my-account" active>Dashboard</Nav.Link>
                                    <Nav.Link href="/my-account/my-order" active>Orders</Nav.Link>
                                    {/* <Nav.Link eventKey="link-2" active>Addresses</Nav.Link> */}
                                    <Nav.Link href="/my-account/edit-account" active>Account details</Nav.Link>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Outlet />
                            </Col>
                        </Row>
                    </div>
                </div>
            )
            }
        </>
    )
}
