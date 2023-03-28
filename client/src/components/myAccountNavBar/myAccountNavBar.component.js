import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import './myAccountNavBar.component.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { logout } from "../../actions/users";

export default function MyAccountNavBar(){
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.users)

    const handleMouseEnter = (e) =>{
        setShow(true)
    }

    const handleMouseLeave = (e) =>{
        setShow(false)
    }

    const handleClickLogout = () =>{
        dispatch(logout())
            .then(() => {

            })
            .catch(() => {});
    }

    return(         
        <div style={{display:"inline-block", marginRight:'12px'}} onMouseEnter={handleMouseEnter}  onMouseLeave={handleMouseLeave}>
            <Nav.Link active ref={target} href="/my-account">
                { !isLoggedIn && <i className="bi bi-person" style={{fontSize:'1rem', marginRight:'12px'}} ></i>}
                { isLoggedIn && <i className="bi bi-person-circle" style={{fontSize:'1rem', marginRight:'12px'}}></i>}
                My Account
            </Nav.Link>
            { !isLoggedIn && 
                <Overlay 
                    target={target} 
                    show={show} 
                    placement="bottom" 
                    // container={target}  
                    popperConfig={
                        {
                            modifiers: [
                                {
                                name: 'offset',
                                enabled: true,
                                options: {
                                    offset: [0, 5]
                                }
                                },
                            ],
                        }
                    }              
                    // containerPadding="50px"
                >
                    <Popover id="popover-contained" className="popover-my-account">
                        <Popover.Header as="h3">Get into your account.</Popover.Header>
                        <Popover.Body>
                            <Button variant="dark" href="/login">Log in</Button>
                            <Button variant="dark" href="/register">Register</Button>
                        </Popover.Body>
                    </Popover>
                </Overlay>
            }
            { isLoggedIn && 
                <Overlay 
                    target={target} 
                    show={show} 
                    placement="bottom" 
                    // container={target}  
                    popperConfig={
                        {
                            modifiers: [
                                {
                                name: 'offset',
                                enabled: true,
                                options: {
                                    offset: [0, 5]
                                }
                                },
                            ],
                        }
                    }              
                    // containerPadding="50px"
                >
                    <Popover id="popover-contained" className="popover-my-account">
                        <Popover.Header as="h3">Hello {user.username}</Popover.Header>
                        <Popover.Header as="h3">
                            <Nav defaultActiveKey="/" className="flex-column">
                                <Nav.Link href="/my-account">My account</Nav.Link>
                                <Nav.Link eventKey="/my-account/my-order">Orders</Nav.Link>
                                <Nav.Link eventKey="link-2">Addresses</Nav.Link>
                                <Nav.Link eventKey="link-2">Account settings</Nav.Link>
                            </Nav>
                        </Popover.Header>
                        <Popover.Body>
                            <Button variant="dark" onClick={()=>handleClickLogout()} href="/login">Log out</Button>
                        </Popover.Body>
                    </Popover>
                </Overlay>
            }
        </div>
    )
}
