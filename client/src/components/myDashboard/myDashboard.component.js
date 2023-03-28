import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { login } from "../../actions/users";
import './myDashboard.component.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function MyDashBoard(){

    const { isLoggedIn, user } = useSelector((state) => state.users)

    return(
        <Container>
            <div>
                Hello
                <br />
                <br />
                From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
            </div>
        </Container>
    )
}
