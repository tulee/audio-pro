import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { login, updateUserInfo } from "../../actions/users";
import './accountDetail.component.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function AccountDetail(){

    const { isLoggedIn, user } = useSelector((state) => state.users)
    const { message } = useSelector((state) => state.message)
    const { status } = useSelector((state) => state.status)
    const [isError, setIsError] = useState(false)
    const[eye,seteye]=useState(true);
    const[passType,setPassType]=useState("password");
    const[type,settype]=useState(false);
    const dispatch = useDispatch();
    const[userInfo, setUserInfo] = useState({
        "id":user._id,
        "first_name":user.first_name,
        "last_name":user.last_name,
        "username":user.username,
        "email":user.email,
        "currentPass":"",
        "newPass":"",
        "confirmPass":"",
    })

    const Eye=()=>{
        if(passType=="password"){
            setPassType("text");
            seteye(false);
            settype(true);
        }
        else{
            setPassType("password");
            seteye(true);
            settype(false);
        }
    }

    const handleSubmit = async () => {
        console.log("in start handle submit");
        if(userInfo.currentPass != "" || userInfo.newPass != "" || userInfo.confirmPass != ""){
            let data = {
                id:userInfo.id,
                newInfo:{
                    first_name:userInfo.first_name,
                    last_name:userInfo.last_name,
                    username:userInfo.username,
                    email:userInfo.email
                },
                passwordChange:{
                    currentPass:userInfo.currentPass,
                    newPass:userInfo.newPass,
                    confirmPass:userInfo.confirmPass
                }
            }
            console.log(data);

            await dispatch(updateUserInfo(data))
        }else {
            let data = {
                id:userInfo.id,
                newInfo:{
                    first_name:userInfo.first_name,
                    last_name:userInfo.last_name,
                    username:userInfo.username,
                    email:userInfo.email
                }
            }
            console.log(data);

            await dispatch(updateUserInfo(data))
        }
    }

    useEffect(()=>{
        console.log(user);
    },[])

    return(
        <Container className="edit-account-container">
            {!isLoggedIn? (<></>) : (
                <Form>
                    {message && (
                        <div className={`alert-update-info ${status?"alert-success":"alert-fail"}`}>
                            {!status?(<i className="bi bi-exclamation-circle-fill" style={{color:"#b81c23", marginRight:"20px"}}></i>):''}
                            {!status?(<b>Error: </b>):''}
                            {message}
                        </div>
                    )}
                <Row className="mb-3">
                    <Form.Group as={Col} style={{marginRight:'20px'}}>
                    <Form.Label>First name *</Form.Label>
                    <Form.Control type="text" value={userInfo.first_name} onChange={e => setUserInfo({...userInfo,"first_name":e.target.value})}/>
                    </Form.Group>

                    <Form.Group as={Col}>
                    <Form.Label>Last name *</Form.Label>
                    <Form.Control type="text" value={userInfo.last_name} onChange={e => setUserInfo({...userInfo,"last_name":e.target.value})}/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" >
                    <Form.Label>Display name *</Form.Label>
                    <Form.Control type="text" value={userInfo.username} onChange={e => setUserInfo({...userInfo,"username":e.target.value})}/>
                    <Form.Text className="text-muted">
                        This will be how your name will be displayed in the account section and in reviews
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Email address *</Form.Label>
                    <Form.Control type="email" value={userInfo.email} onChange={e => setUserInfo({...userInfo,"email":e.target.value})}/>
                </Form.Group>
                <Form.Label>Password change</Form.Label>
                <div className="pass-change-container">
                    <Form.Group className="mb-3">
                        <Form.Label>{"Current password (leave blank to leave unchanged)"}</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control 
                                type={passType} 
                                value={userInfo.currentPass} 
                                onChange={e => setUserInfo({...userInfo,"currentPass":e.target.value})}
                            />
                            <InputGroup.Text id="basic-addon2">
                                <i 
                                    onClick={Eye} 
                                    className={`fa ${eye ? "bi bi-eye" : "bi bi-eye-slash" }`}
                                ></i>
                            </InputGroup.Text>
                        </InputGroup>
                        <Form.Label>{"New password (leave blank to leave unchanged)"}</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control 
                                type={passType} 
                                value={userInfo.newPass} 
                                onChange={e => setUserInfo({...userInfo,"newPass":e.target.value})}
                            />
                            <InputGroup.Text id="basic-addon2">
                                <i 
                                    onClick={Eye} 
                                    className={`fa ${eye ? "bi bi-eye" : "bi bi-eye-slash" }`}
                                ></i>
                            </InputGroup.Text>
                        </InputGroup>
                        <Form.Label>{"Confirm new password"}</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control 
                                type={passType} 
                                value={userInfo.confirmPass} 
                                onChange={e => setUserInfo({...userInfo,"confirmPass":e.target.value})}
                            />
                            <InputGroup.Text id="basic-addon2">
                                <i 
                                    onClick={Eye} 
                                    className={`fa ${eye ? "bi bi-eye" : "bi bi-eye-slash" }`}
                                ></i>
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </div>
                <Button onClick={() => {
                                    handleSubmit().then(response => {
                                        console.log(response);
                                    }).catch(e => {
                                        console.log(e);
                                    })
                                }}>
                    Save changes
                </Button>
            </Form>
            )}
        </Container>
    )
}
