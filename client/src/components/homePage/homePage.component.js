import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../actions/users";
import './homePage.component.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import ProductCard from "../productCard/productCard.component";
import ProductService from "../../services/product.service";

export default function HomePage(){
    const [bestSeller, setBestSeller] = useState([])

    useEffect(()=>{
        const handleGetBestSeller = async () =>{
            let response = await ProductService.find6BestSeller()
            setBestSeller(response.productList)
        }

        handleGetBestSeller()
    },[])
    return(
        <div className="home-container">
            <div className="home-cover-container">
                <div className="left-cover">
                    <h1>CHOOSE RIGHT</h1>
                    <h1>GREAT SYSTEMS.</h1>
                    <p>Combining flagship AUDIO PRO Legend Series drivers with new technologies, Reserve Series Loudspeakers deliver extraordinarily detailed imaging, smooth mid-range, and effortless bass.</p>
                    <Button variant="dark" >OUR BLOG</Button>                
                </div>
                <div className="right-cover">
                    <img src="https://thethaogiaitri.info/wp-content/uploads/2023/02/home2.jpg"/>
                </div>
            </div>
            <div className="section-special-list">
                <h3>EXPLORE BEST SELLERS</h3>
                <div className="product-list">
                    {bestSeller?.map(product => <ProductCard product={product}/>)}
                </div>
            </div>
            <div className="home-cover-category" style={{background:"white"}}>
                <div className="text-cover">
                    <h1>SPEAKERS</h1>
                    <p>Awarded again and again for its amazing sound, the C3 is in a class of its own.</p>
                    <Button variant="dark" >SHOP SPEAKERS</Button>                
                </div>
                <div className="img-cover">
                    <img src="https://thethaogiaitri.info/wp-content/uploads/2023/02/speaker4.jpg"/>
                </div>
            </div>
            <div className="home-cover-category" style={{background:"#f8f8f8"}}>
                <div className="img-cover">
                    <img src="https://thethaogiaitri.info/wp-content/uploads/2023/02/speaker6.jpg"/>
                </div>
                <div className="text-cover">
                    <h1>AMPLIFIERS</h1>
                    <p>The heart of Audio Pro award-winning Network Audio Streamers since 2012.</p>
                    <Button variant="dark" >SHOP AMPLIFIERS</Button>                
                </div>
            </div>
        </div>
    )
}
