import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../actions/users";
import './cartPageRow.component.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { deleteItemCart, updateCart } from "../../actions/cart";
import cartService from "../../services/cart.service";

export default function CartPageRow({item, toogleUpdate, user_id, setIsBtnActive, isBtnActive, cart_id}){
    let [quantity, setQuantity] = useState(item.amount)
    const dispatch = useDispatch();
    let subtotal = item.amount*(item.product_info.is_discount?item.product_info.discount_price:item.product_info.price)

    const handleClickDeleteItem = async () =>{
        let data = {
            user_id:user_id,
            item_id:item._id,
            cart_id:cart_id
        }
        await dispatch(deleteItemCart(data))
        // await dispatch(cartService.findCartByUserId(user_id))
    }
    useEffect(()=>{
        let updated_amount = quantity - item.amount
        console.log(updated_amount);
        const callUpdateCart = async (info) =>{
            await dispatch(updateCart(info))
        }
        if(quantity >= 0){
            let data = {
                user_id:user_id,
                product_id:item.product_id,
                updated_amount:updated_amount,
                selected_power: item.selected_power
            }

            console.log(data);
    
            callUpdateCart(data)
        } else {
            console.log('Quantity can not be negative')
        }

    },[toogleUpdate])

    return(
        <Row className="cart-row">
            <Col lg={8}>
                <Row className="cart-row">
                    <Col lg={2}><img src={item.product_info.images[0]}/></Col>
                    <Col lg={10} style={{fontWeight:"bold"}}>{item.product_info.product_name.toLowerCase()}</Col>
                </Row>
            </Col>
            <Col lg={1}>${new Intl.NumberFormat().format((item.product_info.is_discount?item.product_info.discount_price:item.product_info.price).toFixed(2))}</Col>
            <Col lg={1}>
                <input type="number" 
                    value={quantity} 
                    onChange={e => {
                        setQuantity(e.target.value)
                        if(!isBtnActive){
                            setIsBtnActive(true)
                        }
                    }}
                />
            </Col>
            <Col lg={1}>${new Intl.NumberFormat().format(subtotal.toFixed(2))}</Col>
            <Col lg={1}>
                <button className="delete-item-cart-btn" onClick={()=>handleClickDeleteItem()}>x</button>
            </Col>
        </Row> 
    )
}