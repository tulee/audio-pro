import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../actions/users";
import './login.component.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";

export default function LoginComponent(){
    const [user, setUser] = useState({ username: "", password: "" })
    const { message } = useSelector((state) => state.message)
    const { isLoggedIn } = useSelector((state) => state.users)
    const dispatch = useDispatch();
    const[eye,seteye]=useState(true);
    const[passType,setPassType]=useState("password");
    const[type,settype]=useState(false);
    const [validated, setValidated] = useState(false);

    function handleClickLogin(event){
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
          event.stopPropagation();
        } else {
            dispatch(login(user))
                .then(() => {

                })
                .catch(() => {});
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

    return(
        <>
            {isLoggedIn && <Navigate to='/my-account'/>}
            { !isLoggedIn && (
                <div className="login-component">
                    <h1 className="page-name">MY ACCOUNT</h1>
                    {message && (
                        <div className="alert-login">
                            <i className="bi bi-exclamation-circle-fill" style={{color:"#b81c23", marginRight:"20px"}}></i>
                            <b>Error: </b>{message}
                        </div>
                    )}
                    <h2 className="form-name">Login</h2>
                    <div className="login-form">
                        <Form noValidate validated={validated} onSubmit={handleClickLogin}>
                            <Form.Group className="mb-3" controlId="validationUsernameOrEmail">
                                <Form.Label>Username or Email address</Form.Label>
                                <Form.Control type="text" 
                                    onChange={(e) => {
                                        setUser(user => ({...user,"username":e.target.value}));
                                    }}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    Username can not be empty
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <InputGroup className="mb-3" hasValidation>
                                    <Form.Control 
                                        type={passType} 
                                        onChange={(e) => {
                                            setUser(user => ({...user,"password":e.target.value}));
                                        }}
                                        required
                                        // aria-describedby="basic-addon2"
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
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Remember me" />
                            </Form.Group>
                            <Button type="submit">
                                Log in
                            </Button>
                        </Form>
                    </div>
                </div>
            )}
        </>
    )
}

// function mapStateToProps(state) {
//     const { isLoggedIn } = state.users;
//     const { message } = state.message;
//     return { isLoggedIn, message };
//   }
  
// export default connect(mapStateToProps)(LoginComponent);