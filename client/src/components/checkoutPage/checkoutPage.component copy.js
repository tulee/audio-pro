// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux'
// import { connect } from "react-redux";
// import { Navigate, useNavigate } from "react-router-dom";
// import { login } from "../../actions/users";
// import './checkoutPage.component.css'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { InputGroup } from "react-bootstrap";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import CartPageRow from "../cartPageRow/cartPageRow.component";
// import Container from 'react-bootstrap/Container';
// import CartService from "../../services/cart.service";
// import { createOrder } from "../../actions/order";
// import OrderService from "../../services/order.service";
// import _, { values } from "lodash"
// import * as yup from 'yup';
// import { Formik } from "formik";


// export default function CheckoutPageCopy(){
//     // const { message } = useSelector((state) => state.message)
//     const [message, setMessage] = useState();
//     const [billingAddress, setBillingAddress] = useState({})
//     // const [shipDisplay, setShipDisplay] = useState(false)
//     const { isLoggedIn } = useSelector((state) => state.users)
//     const dispatch = useDispatch();
//     const { cart } = useSelector((state) => state.cart)
//     const { user } = useSelector((state) => state.users)
//     const [cartValue, setCartValue] = useState(0)
//     const [subtotal, setSubtotal] = useState(0)
//     const [total, setTotal] = useState(0)
//     const [firstName, setFirstName] = useState()
//     const [lastName, setLastName] = useState('')
//     const [city, setCity] = useState('')
//     const [ward, setWard] = useState('')
//     const [address, setAddress] = useState('')
//     const [zip, setZip] = useState('')
//     const [country, setCountry] = useState('')
//     const [note, setNote] = useState('')
//     const [phone, setPhone] = useState('')
//     const navigate = useNavigate()

//     const handleCfAddress = (values) => {
//           let billing_address = {
//             first_name:values.firstName,
//             last_name:values.lastName,
//             address:values.address,
//             city:values.city,
//             ward:values.ward,
//             country:values.country,
//             note:values.note,
//             phone:values.phone,
//             zip:values.zip
//           }

//           setBillingAddress(billing_address)
//           console.log(billingAddress);

//     }

//     const handleClickOrder = async () =>{
//         console.log("click order ne");
//         if(values && !_.isEmpty(values)){
//             let cart_list = cart.cart
//             let cart_value = CartService.calCartValue(cart_list)
//             let order = {
//                 user_id: user._id,    
//                 created_date: new Date(),
//                 total: cart_value+0,
//                 subtotal:cart_value,
//                 shippping_fee:0,
//                 items:
//                     cart_list.map(e => 
//                         {
//                             let last_price = e.product_info.is_discount?e.product_info.discount_price:e.product_info.price
//                             return (
//                                 {
//                                     amount:e.amount,
//                                     product_id:e.product_info.product_id,
//                                     power:e.power_seclected,
//                                     sku:e.product_info.sku,
//                                     image:e.product_info.image,
//                                     product_name:e.product_info.product_name,
//                                     slug:e.product_info.slug,
//                                     last_price:last_price
//                                 }
//                             )
//                         }
//                     )
//                 ,
//                 shipping_address:billingAddress,
//                 payment_method:"Cash on delivery",
//                 order_status:"new"
//             }

//             // let res = await dispatch(createOrder(order))
//             let res = await OrderService.createOrder(order)
//             console.log(res.received_order);
//             if(res.status){
//                 sessionStorage.setItem('received_order',JSON.stringify(res.received_order))
//                 navigate("/order-received")
//                 console.log("order thanh cong");
//             }else {
//                 console.log("hien noti bao khong thanh cong va cac loi");
//             }
//         } else {
//             setMessage("Have to confirm address firstly");
//         }
//     }

//     const schema = yup.object().shape({
//         firstName: yup.string().required(),
//         lastName: yup.string().required(),
//         username: yup.string().required(),
//         address: yup.string().required(),
//         city: yup.string().required(),
//         ward: yup.string().required(),
//         zip: yup.string().required(),
//         country: yup.string().required(),
//         phone: yup.string().required(),
//         note: yup.string().required()
//       });

//     useEffect(()=>{
//         if(cart){
//             let newSubtotal = CartService.calCartValue(cart.cart)
//             setSubtotal(newSubtotal)
//             setTotal(newSubtotal)
//         }

//     },[cart])

//     useEffect(() =>{
//         if(user&& user!=={}){
//             if(user.billing_address.length>0){
//                 setFirstName(user.billing_address[0].first_name)
//                 setLastName(user.billing_address[0].last_name)
//                 setAddress(user.billing_address[0].address)
//                 setCity(user.billing_address[0].city)
//                 setWard(user.billing_address[0].ward)
//                 setCountry(user.billing_address[0].country)
//                 setNote(user.billing_address[0].note)
//                 setPhone(user.billing_address[0].phone)
//                 setZip(user.billing_address[0].zip)
//             }
//             else {
//                 setFirstName('')
//                 setLastName('')
//                 setAddress('')
//                 setCity('')
//                 setWard('')
//                 setCountry('')
//                 setNote('')
//                 setPhone('')
//                 setZip('')
//             }
//         }
//     },[])

//     return(
//         <>
//             {!isLoggedIn && <Navigate to='/my-account'/>}
//             { isLoggedIn && (typeof(firstName)!= "undefined") && (
//                 <div className="checkout_page_container">
//                     <h1>CHECKOUT</h1>
//                     <div className="checkout_page_content">
//                         <div className="checkout-detail">
//                         <Formik
//                             validationSchema={schema}
//                             onSubmit={console.log(values)}
//                             initialValues={{
//                                 firstName: firstName,
//                                 lastName: lastName,
//                                 address: address,
//                                 city: city,
//                                 ward: ward,
//                                 country: country,
//                                 phone: phone,
//                                 note:note,
//                                 zip:zip
//                             }}
//                             >
//                             {({
//                                 handleSubmit,
//                                 handleChange,
//                                 handleBlur,
//                                 values,
//                                 touched,
//                                 isValid,
//                                 errors
//                             }) => (    
//                                 <Form noValidate onSubmit={handleSubmit}>
//                                     <div className="header-checkout-detail">
//                                         <h3>Billing details</h3>
//                                         <Button type="submit">Confirm address</Button>
//                                     </div>
//                                     {message && (
//                                         <div className="alert-checkout">
//                                             <i className="bi bi-exclamation-circle-fill" style={{color:"#b81c23", marginRight:"20px"}}></i>
//                                             <b>Error: </b>{message}
//                                         </div>
//                                     )}
//                                     <Row className="mb-3">

//                                         <Form.Group as={Col} controlId="validationFormik01" style={{marginRight:'10px'}}>
//                                             <Form.Label>First name</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="firstName"
//                                                 value={values.firstName}
//                                                 onChange={handleChange}
//                                                 isInvalid={!!errors.firstName}
//                                             />
//                                             <Form.Control.Feedback type="invalid">
//                                                 {errors.firstName}
//                                             </Form.Control.Feedback>
//                                         </Form.Group>

//                                         <Form.Group as={Col} controlId="validationFormik02" >
//                                             <Form.Label>Last name</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="lastName"
//                                                 value={values.lastName}
//                                                 onChange={handleChange}
//                                                 isInvalid={!!errors.lastName}
//                                             />
//                                             <Form.Control.Feedback type="invalid">
//                                                 {errors.lastName}
//                                             </Form.Control.Feedback>
//                                         </Form.Group>
                                        
//                                     </Row>

//                                     <Form.Group className="mb-3" controlId="validationFormik03" >
//                                         <Form.Label>Address</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             name="address"
//                                             value={values.address}
//                                             onChange={handleChange}
//                                             isInvalid={!!errors.address}
//                                         />
//                                         <Form.Control.Feedback type="invalid">
//                                             {errors.address}
//                                         </Form.Control.Feedback>
//                                     </Form.Group>

//                                     <Row className="mb-3">

//                                         <Form.Group as={Col} controlId="validationFormik04" style={{marginRight:'10px'}}>
//                                             <Form.Label>City</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="city"
//                                                 value={values.city}
//                                                 onChange={handleChange}
//                                                 isInvalid={!!errors.city}
//                                             />
//                                             <Form.Control.Feedback type="invalid">
//                                                 {errors.city}
//                                             </Form.Control.Feedback>
//                                         </Form.Group>

//                                         <Form.Group as={Col} controlId="validationFormik05" style={{marginRight:'10px'}}>
//                                             <Form.Label>Ward</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="ward"
//                                                 value={values.ward}
//                                                 onChange={handleChange}
//                                                 isInvalid={!!errors.ward}
//                                             />
//                                             <Form.Control.Feedback type="invalid">
//                                                 {errors.ward}
//                                             </Form.Control.Feedback>
//                                         </Form.Group>

//                                         <Form.Group as={Col} controlId="validationFormik06">
//                                             <Form.Label>Zip</Form.Label>
//                                             <Form.Control
//                                                 type="text"
//                                                 name="zip"
//                                                 value={values.zip}
//                                                 onChange={handleChange}
//                                                 isInvalid={!!errors.zip}
//                                             />
//                                             <Form.Control.Feedback type="invalid">
//                                                 {errors.zip}
//                                             </Form.Control.Feedback>
//                                         </Form.Group>
//                                     </Row>

//                                     <Form.Group className="mb-3" controlId="validationFormik07" >
//                                         <Form.Label>Country</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             name="country"
//                                             value={values.country}
//                                             onChange={handleChange}
//                                             isInvalid={!!errors.country}
//                                         />
//                                         <Form.Control.Feedback type="invalid">
//                                             {errors.country}
//                                         </Form.Control.Feedback>
//                                     </Form.Group>

//                                     <Form.Group className="mb-3" controlId="validationFormik08" >
//                                         <Form.Label>Phone</Form.Label>
//                                         <Form.Control
//                                             type="text"
//                                             name="phone"
//                                             value={values.phone}
//                                             onChange={handleChange}
//                                             isInvalid={!!errors.phone}
//                                         />
//                                         <Form.Control.Feedback type="invalid">
//                                             {errors.phone}
//                                         </Form.Control.Feedback>
//                                     </Form.Group>

//                                     <Form.Group className="mb-3" controlId="validationFormik09" >
//                                         <Form.Label>Other notes (optional)</Form.Label>
//                                         <Form.Control
//                                             as="textarea"
//                                             type="text"
//                                             name="note"
//                                             style={{height:"200px"}} 
//                                             value={values.note}
//                                             onChange={handleChange}
//                                             placeholder="Notes about your order, e.g. special notes for delivery."
//                                         />
//                                     </Form.Group>

//                                 </Form>)}
//                             </Formik>
//                         </div>
//                         <div className="checkout-total">
//                             <h3>Your order</h3>
//                             <Row >
//                                 <Col sm={10}><b>Product</b></Col>
//                                 <Col sm={2}><b>Subtotal</b></Col>
//                             </Row>
//                             {cart?.cart.map(e => {
//                                 let subtotal = e.amount*(e.product_info.is_discount?e.product_info.discount_price:e.product_info.price)
//                                 return (
//                                     <Row>
//                                         <Col sm={10}>{e.product_info.product_name.toLowerCase()}</Col>
//                                         <Col sm={2}>${new Intl.NumberFormat().format(subtotal.toFixed(2))}</Col>
//                                     </Row>
//                                 )
//                             })}
//                             <Row>
//                                 <Col sm={10}><b>Subtotal</b></Col>
//                                 <Col sm={2}><b>${new Intl.NumberFormat().format(subtotal.toFixed(2))}</b></Col>
//                             </Row>
//                             <Row style={{display:billingAddress.first_name?"block":"none"}}>
//                                 <Col sm={10}><b>Shipping fee</b></Col>
//                                 <Col sm={2}><b>Freeship</b></Col>
//                             </Row>
//                             <Row>
//                                 <Col sm={10}><b>Total</b></Col>
//                                 <Col sm={2}><b>${new Intl.NumberFormat().format(total.toFixed(2))}</b></Col>
//                             </Row>
//                             <div className="cf_billing_address" >
//                                 <h3>Confirmed Billing Address</h3>
//                                 <div>
//                                     <a>First name: {billingAddress.first_name}</a><br />
//                                     <a>Last name: {billingAddress.last_name}</a><br />
//                                     <a>Address: {billingAddress.address}</a><br />
//                                     <a>City: {billingAddress.city}</a><br />
//                                     <a>Ward: {billingAddress.ward}</a><br />
//                                     <a>Zip: {billingAddress.zip}</a><br />
//                                     <a>Country: {billingAddress.country}</a><br />
//                                     <a>Phone: {billingAddress.phone}</a><br />
//                                     <a>Note: {billingAddress.note}</a><br />
//                                 </div>
//                             </div>
//                             <p><b>Cash on delivery</b></p>
//                             <button className="order-btn" onClick={()=> handleClickOrder()}>PLACE ORDER</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// // import React from 'react';
// // import { Formik, Form, Field } from 'formik';
// // import * as Yup from 'yup';


// // export default function CheckoutPage () {
// //     const SignupSchema = Yup.object().shape({
// //         firstName: Yup.string()
// //           .min(2, 'Too Short!')
// //           .max(50, 'Too Long!')
// //           .required('Required'),
// //         lastName: Yup.string()
// //           .min(2, 'Too Short!')
// //           .max(50, 'Too Long!')
// //           .required('Required'),
// //         email: Yup.string().email('Invalid email').required('Required'),
// //       })
// //   return (
// //     <div>
// //     <h1>Signup</h1>
// //     <Formik
// //       initialValues={{
// //         firstName: '',
// //         lastName: '',
// //         email: '',
// //       }}
// //       validationSchema={SignupSchema}
// //       onSubmit={values => {
// //         // same shape as initial values
// //         console.log(values);
// //       }}
// //     >
// //       {({ errors, touched }) => (
// //         <Form>
// //           <Field name="firstName" />
// //           {errors.firstName && touched.firstName ? (
// //             <div>{errors.firstName}</div>
// //           ) : null}
// //           <Field name="lastName" />
// //           {errors.lastName && touched.lastName ? (
// //             <div>{errors.lastName}</div>
// //           ) : null}
// //           <Field name="email" type="email" />
// //           {errors.email && touched.email ? <div>{errors.email}</div> : null}
// //           <button type="submit">Submit</button>
// //         </Form>
// //       )}
// //     </Formik>
// //   </div>
// //   )
// //           }

// // import { Formik } from 'formik';
// // import Button from 'react-bootstrap/Button';
// // import Col from 'react-bootstrap/Col';
// // import Form from 'react-bootstrap/Form';
// // import InputGroup from 'react-bootstrap/InputGroup';
// // import Row from 'react-bootstrap/Row';

// // import * as yup from 'yup';

// // export default function CheckoutPage() {

// // const schema = yup.object().shape({
// //   firstName: yup.string().required(),
// //   lastName: yup.string().required(),
// //   username: yup.string().required(),
// //   city: yup.string().required(),
// //   state: yup.string().required(),
// //   zip: yup.string().required(),
// //   terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
// // });

// // const handleSubmitForm = () =>{
// //     console.log("hello");
// // }

// //   return (
// //     <Formik
// //       validationSchema={schema}
// //       onSubmit={()=> handleSubmitForm()}
// //       initialValues={{
// //         firstName: 'Mark',
// //         lastName: 'Otto',
// //         username: '',
// //         city: '',
// //         state: '',
// //         zip: '',
// //         terms: false,
// //       }}
// //     >
// //       {({
// //         handleSubmit,
// //         handleChange,
// //         handleBlur,
// //         values,
// //         touched,
// //         isValid,
// //         errors,
// //       }) => (
// //         <Form noValidate onSubmit={handleSubmit}>
// //           <Row className="mb-3">
// //             <Form.Group as={Col} md="4" controlId="validationFormik01">
// //               <Form.Label>First name</Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 name="firstName"
// //                 value={values.firstName}
// //                 onChange={handleChange}
// //                 isValid={touched.firstName && !errors.firstName}
// //               />
// //               <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
// //             </Form.Group>
// //             <Form.Group as={Col} md="4" controlId="validationFormik02">
// //               <Form.Label>Last name</Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 name="lastName"
// //                 value={values.lastName}
// //                 onChange={handleChange}
// //                 isValid={touched.lastName && !errors.lastName}
// //               />

// //               <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
// //             </Form.Group>
// //             <Form.Group as={Col} md="4" controlId="validationFormikUsername">
// //               <Form.Label>Username</Form.Label>
// //               <InputGroup hasValidation>
// //                 <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
// //                 <Form.Control
// //                   type="text"
// //                   placeholder="Username"
// //                   aria-describedby="inputGroupPrepend"
// //                   name="username"
// //                   value={values.username}
// //                   onChange={handleChange}
// //                   isInvalid={!!errors.username}
// //                 />
// //                 <Form.Control.Feedback type="invalid">
// //                   {errors.username}
// //                 </Form.Control.Feedback>
// //               </InputGroup>
// //             </Form.Group>
// //           </Row>
// //           <Row className="mb-3">
// //             <Form.Group as={Col} md="6" controlId="validationFormik03">
// //               <Form.Label>City</Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 placeholder="City"
// //                 name="city"
// //                 value={values.city}
// //                 onChange={handleChange}
// //                 isInvalid={!!errors.city}
// //               />

// //               <Form.Control.Feedback type="invalid">
// //                 {errors.city}
// //               </Form.Control.Feedback>
// //             </Form.Group>
// //             <Form.Group as={Col} md="3" controlId="validationFormik04">
// //               <Form.Label>State</Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 placeholder="State"
// //                 name="state"
// //                 value={values.state}
// //                 onChange={handleChange}
// //                 isInvalid={!!errors.state}
// //               />
// //               <Form.Control.Feedback type="invalid">
// //                 {errors.state}
// //               </Form.Control.Feedback>
// //             </Form.Group>
// //             <Form.Group as={Col} md="3" controlId="validationFormik05">
// //               <Form.Label>Zip</Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 placeholder="Zip"
// //                 name="zip"
// //                 value={values.zip}
// //                 onChange={handleChange}
// //                 isInvalid={!!errors.zip}
// //               />

// //               <Form.Control.Feedback type="invalid">
// //                 {errors.zip}
// //               </Form.Control.Feedback>
// //             </Form.Group>
// //           </Row>
// //           <Form.Group className="mb-3">
// //             <Form.Check
// //               required
// //               name="terms"
// //               label="Agree to terms and conditions"
// //               onChange={handleChange}
// //               isInvalid={!!errors.terms}
// //               feedback={errors.terms}
// //               feedbackType="invalid"
// //               id="validationFormik0"
// //             />
// //           </Form.Group>
// //           <Button type="submit">Submit form</Button>
// //         </Form>
// //       )}
// //     </Formik>
// //   );
// // }

