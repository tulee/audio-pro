import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../actions/users";
import './productCard.component.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

export default function ProductCard({product}){
    const navigate = useNavigate()

    const handleClickCard = () =>{
        navigate(`/product/${product.slug}`)
    }
    return(
        <Card className="product-card" onClick={()=> handleClickCard()}>
            <Card.Img variant="top" src={product.images[0]} />
            <Card.Body>
                <Card.Title>{product.product_name.toLowerCase()}</Card.Title>
                <Card.Body>
                    <a className="discount-price">${product.price}</a>
                    <a className="last-price">${product.discount_price}</a>
                </Card.Body>
            </Card.Body>
        </Card>
    )
}
