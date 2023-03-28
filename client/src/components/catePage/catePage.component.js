import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { login } from "../../actions/users";
import './catePage.component.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import ProductCard from "../productCard/productCard.component";
import ProductService from "../../services/product.service";

export default function CatePage(){
    const [searchParams, setSearchParams] = useSearchParams();
    const [power, setPower] = useState([])
    const [productList, setProductList] = useState([])
    const [filterPower,setFilterPower] = useState([])
    const params = useParams()

    const handleGetByCate = async (pow) =>{
        let response = await ProductService.findByCate(params.cate,pow)
        let merge = []
        let tempArr = []
        response.productList.map((e) =>{
            merge = merge.concat(e.power)
        })
        let uniquePower = Array.from(new Set(merge))
        console.log(filterPower);
        uniquePower.map((e) => {
            if(pow.includes(e)){
                tempArr.push({
                    value:e,
                    isDisplay:true,
                    isActive:true
                })
            } else {
                tempArr.push({
                    value:e,
                    isDisplay:true,
                    isActive:false
                })
            }
        })

        setFilterPower(tempArr)
        setProductList(response.productList)
    }
    const handleClickPower = (e) => {
        let newPower = power
        newPower = [...newPower,e]
        
        setPower(newPower)
        setSearchParams({power: newPower.toString()});
        handleGetByCate(newPower)
      };

    const handleClickRemovePower = (value) =>{
        let newPower = power
        newPower = newPower.filter(e => e !== value)
        setPower(newPower)
        setSearchParams({power: newPower.toString()});
        handleGetByCate(newPower)
    }

    const handleClearAllFilter = () =>{
        setPower([])
        searchParams.delete('power')
        setSearchParams(searchParams)
        handleGetByCate([])
    }

    useEffect(()=>{
        let newPower = searchParams.get('power')
        if(newPower&&newPower[0]!=''&&newPower[0]){
            newPower = newPower.split(',')
          }else{
            newPower = []
          }
        setPower(newPower)
        handleGetByCate(newPower)
    },[])
    return(
        <div className="page-container">
            <h1 className="category-name">{params.cate.toUpperCase()}</h1>
            <div className="page-content">
                <div className="left-side-content">
                    <button className="clear-filter-btn" 
                        onClick={()=> handleClearAllFilter()} 
                        style={{display:power.length==0?"none":"block"}}
                    >Clear all filter</button>
                    <h3>POWER</h3>
                    <div className="filter-container">
                        {filterPower?.map(e => {
                            return <button className={`btn-power ${e.isActive?'power-active power-disable':''}`} key={e.value} onClick={()=>handleClickPower(e.value)} style={{display:!e.isDisplay?"none":"inline-block"}}>{e.value}</button>
                        })}
                    </div>
                </div>
                <div className="right-side-content">
                    <div className="filter-bar">
                        <div className="choosed-filter">
                            {power?.map(e => {
                                return <button key={e} onClick={()=>handleClickRemovePower(e)} className='power-active'>{e}</button>
                            })}
                        </div>
                        <div className="sort-bar">
                            <Form.Select size="sm">
                                <option>Default sorting</option>
                                <option>Sort by price low to high</option>
                                <option>Sort by price high to low</option>
                            </Form.Select>
                        </div>
                    </div>
                    <div className="product-list">
                        {productList?.map(product => <ProductCard product={product} key={product.sku}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
