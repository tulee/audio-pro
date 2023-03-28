import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { login, registerUser } from "../../actions/users";
import './registerPage.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, InputGroup, Row } from "react-bootstrap";

export default function RegisterPageComponent(){
    const [user, setUser] = useState({ username: ""
                                    , password:""
                                    , confirmPass:""
                                    , first_name:""
                                    , last_name:""
                                    , email:"" 
                                    })
    const { message } = useSelector((state) => state.message)
    const { isLoggedIn } = useSelector((state) => state.users)
    const dispatch = useDispatch();
    const[eye,seteye]=useState(true);
    const[passType,setPassType]=useState("password");
    const[type,settype]=useState(false);
    const [validated, setValidated] = useState(false);

    function handleClickLogin(event){
        const form = event.currentTarget;
        const handleRegister = () =>{
            dispatch(registerUser(user))
        }
        
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
            handleRegister().then(

                ).catch()
        }

        setValidated(true);
    }

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

    useEffect(()=>{
        console.log(isLoggedIn);
    },[])

    return(
        <>
        {isLoggedIn && <Navigate to='/my-account'/>}
        {!isLoggedIn && (
            <div className="register-component">
                <h1 className="page-name">MY ACCOUNT</h1>
                {message && (
                    <div className="alert-login">
                        <i className="bi bi-exclamation-circle-fill" style={{color:"#b81c23", marginRight:"20px"}}></i>
                        <b>Error: </b>{message}
                    </div>
                )}
                <h2 className="form-name">Register</h2>
                <Container className="register-form-container">
                        <Form noValidate validated={validated} onSubmit={handleClickLogin}>
                        <Row className="mb-3">
                            <Form.Group as={Col} style={{marginRight:'20px'}}>
                                <Form.Label>First name *</Form.Label>
                                <Form.Control type="text" 
                                    value={user.first_name} 
                                    onChange={e => setUser({...user,"first_name":e.target.value})}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    First name can not be empty
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Last name *</Form.Label>
                                <Form.Control type="text" value={user.last_name} onChange={e => setUser({...user,"last_name":e.target.value})} required/>
                                <Form.Control.Feedback type="invalid">
                                    Last name can not be empty
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" >
                            <Form.Label>Display name *</Form.Label>
                            <Form.Control type="text" value={user.username} onChange={e => setUser({...user,"username":e.target.value})} required/>
                            <Form.Control.Feedback type="invalid">
                                Display name can not be empty
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                This will be how your name will be displayed in the account section and in reviews
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Email address *</Form.Label>
                            <Form.Control type="email" value={user.email} onChange={e => setUser({...user,"email":e.target.value})} required/>
                            <Form.Control.Feedback type="invalid">
                                Email can not be empty
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Label>Password</Form.Label>
                        <div className="pass-change-container">
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <InputGroup className="mb-3" hasValidation>
                                    <Form.Control 
                                        type={passType} 
                                        value={user.password} 
                                        onChange={e => setUser({...user,"password":e.target.value})}
                                        required
                                    />
                                    <InputGroup.Text id="basic-addon2">
                                        <i 
                                            onClick={Eye} 
                                            className={`fa ${eye ? "bi bi-eye" : "bi bi-eye-slash" }`}
                                        ></i>
                                    </InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">
                                        Password can not be empty
                                    </Form.Control.Feedback>
                                </InputGroup>
                                <Form.Label>{"Confirm password"}</Form.Label>
                                <InputGroup className="mb-3" hasValidation>
                                    <Form.Control 
                                        type={passType} 
                                        value={user.confirmPass} 
                                        onChange={e => setUser({...user,"confirmPass":e.target.value})}
                                        required
                                    />
                                    <InputGroup.Text id="basic-addon2">
                                        <i 
                                            onClick={Eye} 
                                            className={`fa ${eye ? "bi bi-eye" : "bi bi-eye-slash" }`}
                                        ></i>
                                    </InputGroup.Text>
                                    <Form.Control.Feedback type="invalid">
                                        Must reconfirm password
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </div>
                        <Button type="submit">
                            Save changes
                        </Button>
                    </Form>
                    
                </Container>
            </div>
        )}
        
        </>
    )
}

