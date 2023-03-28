import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import { findProductBySlug } from "../../actions/product";
import ImgCarousel from "../imgCarousel/imgCarousel";
import './productDetailPage.component.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactStars from 'react-stars'
import { findCartByUserId, updateCart } from "../../actions/cart";


export default function ProductDetailPage(){
    const params = useParams()
    const dispatch = useDispatch();
    const [productLoaded, setProductLoaded] = useState({})
    const { product } = useSelector((state) => state.product)
    const { user } = useSelector((state) => state.users)
    const { cart } = useSelector((state) => state.cart)
    const [amount, setAmount] = useState(1)
    const [selectedPower, setSelectedPower] = useState('')

    const handleClickAtc = async () =>{
        if(user){
            let data = {
                user_id:user._id,
                product_id:product._id,
                updated_amount:amount,
                selected_power: product.power[0]
            }

            await dispatch(updateCart(data))
        }
    }

    const ratingChanged = (newRating) => {
        console.log(newRating)
      }

    useEffect(()=>{
        const loadData = async () => {
            await dispatch(findProductBySlug(params.slug))
        }
        loadData()
    },[])

    useEffect(()=>{
        if(product){
            setProductLoaded(product)
        } else {
            return
        }
    },[product])

    return(
        <>
        {!productLoaded.product_name?(<></>):(
            <div className="product_page_container">
            <h1 className="product_page_heading">{productLoaded.product_name}</h1>
            <div className="price_container">
                <div className="old_price">${productLoaded.is_discount?productLoaded.price.toFixed(2):""}</div>
                <div className="last_price">${productLoaded.is_discount?productLoaded.discount_price?.toFixed(2):productLoaded.price?.toFixed(2)}</div>
            </div>
            <div className="product_quick_view">
                <div className="product_image">
                    <ImgCarousel images={productLoaded.images}/>
                </div>
                <div className="product_control">
                    <div className="product_sku">{productLoaded.sku}</div>
                    <br />
                    <div className="product_short_des">{productLoaded.short_des}</div>
                    <br />
                    <div className="product_action">
                        <input className="product_atc_amount" type="number" value={amount} onChange={e => setAmount(e.target.value)}></input>
                        <button className="product_btn_atc" onClick={()=>handleClickAtc()}>ADD TO CART</button>
                    </div>
                </div>
            </div>
            <div className="product_detail_info">
                <h3 className="heading_detail_product">OVERVIEW</h3>
                <p>{productLoaded.overview}</p>
                <b><p>Highlights</p></b>
                <p>{productLoaded.overview}</p>
                <ul>
                    {productLoaded.highlights.map((e) => <li key={e}>{e}</li>)}
                </ul>
                <b><p>Technical Details</p></b>
                <ul>
                    {productLoaded.technical_details.map((e) => <li key={e}>{e}</li>)}
                </ul>
            </div>
            <div className="product_detail_info">
                <h3 className="heading_detail_product">REVIEWS</h3>
                <b><p>Reviews</p></b>
                {productLoaded.reviews.length > 0? (<p>{productLoaded.reviews}</p>):(
                    <p>There are no reviews yet.
                        <br /><br />
                        <b>{`Be the first to review "${productLoaded.product_name}"`}</b>
                    </p>
                )}
                <p>Your email address will not be published. Required fields are marked *</p>
            </div>
            <div className="review_form">
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>Your rating *</Form.Label>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            color2={'#ffd700'} 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Your review *</Form.Label>
                        <Form.Control as="textarea"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Name *</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Save my name, email, and website in this browser for the next time I comment." />
                    </Form.Group>
                    <Button type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
        )}
        </>
    )
}
