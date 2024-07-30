import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Form from "react-bootstrap/Form";
//import Swal from "sweetalert2";
//import axios from "axios";
import './Login.css';

function Login() {
    const [isValidated, setValidated] = useState(false);

    const emailref = useRef();
    const passwordref = useRef();

    const [validateEmail , setValidateEmail]=useState(true)
    const [validatePassword , setValidatePassword] = useState(true)


    useEffect(()=>{
        document.body.classList.add('Login-Page-body');

        return ()=>{
            document.body.classList.remove('Login-Page-body');
        }
    },[])



    const submitformHandler = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        const EnteredEmail = emailref.current.value;
        const EnteredPassword = passwordref.current.value;

        let formIsValid = true;

        if (!EnteredEmail.trim().includes('@')) {
            setValidateEmail(false);
            formIsValid = false;
        } else {
            setValidateEmail(true);
        }

        
        if(EnteredPassword.trim().length < 8 ){
            setValidatePassword(false)
            formIsValid = false;
        }
        else{
            setValidatePassword(true)
        }

        if (formIsValid) {
            console.log('login');
        } else {
            setValidated(false);
        }
    };

    return (
        <div className={"login-container"}>
            <Form noValidate validated={isValidated} className={'login-box'} onSubmit={submitformHandler}>
                <h2>Login</h2>
                
                
                <FloatingLabel controlId="email" label="Email" className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        required
                        ref={emailref}
                        isInvalid={!validateEmail}
                        className="border-dark border-1 text-dark"
                    />
                    <Form.Control.Feedback type='invalid'>
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </FloatingLabel>


                <FloatingLabel controlId="password" label="Password" className="mb-3">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        ref={passwordref}
                        isInvalid={!validatePassword}
                        className="border-dark border-1 text-dark"
                    />
                    <Form.Control.Feedback type='invalid'>
                        Please Enter Your Password.
                    </Form.Control.Feedback>
      
                </FloatingLabel>
                <div className="d-flex justify-content-center">
                <Button className=" btn-primary btn-lg " type="submit">Login</Button>
                </div>
                       
                        <p className="text-lg-center mt-2" >You don't have an account Click ! <Link to='/Signup' className='text-decoration-none'>Signup</Link> </p>
            </Form>
        </div>
    );
}

export default Login;
