import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Form from "react-bootstrap/Form";
import axios from "axios";
import './Signup.css';

function Signup() {
    const [isValidated, setValidated] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [emailForOtp, setEmailForOtp] = useState('');
    const nameref = useRef();
    const emailref = useRef();
    const passwordref = useRef();
    const conformpasswordref = useRef();
    const phonenoref = useRef();

    const [validateEmail , setValidateEmail]=useState(true)
    const [validateName , setValidateName] = useState(true)
    const [validatePhoneno , setValidatePhoneno] = useState(true)
    const [validatePassword , setValidatePassword] = useState(true)
    const [validateCPassword, setValidateCPassword] = useState(true)

    const sendOtpHandler = async () => {
        const EnteredEmail = emailref.current.value;
        setEmailForOtp(EnteredEmail);

        try {
            // const response = await axios.post('http:localhost:8082/send-otp', { email: EnteredEmail });
            // if (response.data.success) {
                 setIsOtpSent(true);
            //     alert('OTP sent to your email');
            // } else {
            //     alert('Failed to send OTP');
            // }
        } catch (error) {
            console.error('Error sending OTP', error);
        }
    };

    const verifyOtpHandler = async () => {
        try {
            const response = await axios.post('http:localhost:8082/verify-otp', { email: emailForOtp, otp });
            if (response.data.success) {
                await storeUserDetails();
            } else {
                alert('Invalid OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP', error);
        }
    };

    const storeUserDetails = async () => {
        const EnteredName = nameref.current.value;
        const EnteredPhoneno = phonenoref.current.value;
        const EnteredEmail = emailref.current.value;
        const EnteredPassword = passwordref.current.value;

        try {
            const response = await axios.post('http:localhost:8082/register', {
                name: EnteredName,
                email: EnteredEmail,
                phoneno: EnteredPhoneno,
                password: EnteredPassword
            });
            if (response.data.success) {
                alert('Signup successful!');
                // Redirect to login or other page if needed
            } else {
                alert('Signup failed');
            }
        } catch (error) {
            console.error('Error storing user details', error);
        }
    };

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
        const conformpassword = conformpasswordref.current.value;

        let formIsValid = true;

        if (!EnteredEmail.trim().includes('@')) {
            setValidateEmail(false);
            formIsValid = false;
        } else {
            setValidateEmail(true);
        }

        if (nameref.current.value.length <= 1) {
            setValidateName(false);
            formIsValid = false;
        } else {
            setValidateName(true);
        }

        if (!/^\d{10}$/.test(phonenoref.current.value)) {
            setValidatePhoneno(false);
            formIsValid = false;
        } else {
            setValidatePhoneno(true);
        }
        
        if(EnteredPassword.trim().length < 8 || EnteredPassword.trim().length > 20){
            setValidatePassword(false)
            formIsValid = false;
        }
        else{
            setValidatePassword(true)
        }
        if (EnteredPassword !== conformpassword) {
            setValidateCPassword(false);
            formIsValid = false;
        } else {
            setValidateCPassword(true);
        }

        if (formIsValid) {
            if (!isOtpSent) {
                sendOtpHandler();
            }
        } else {
            setValidated(false);
        }
    };

    return (
        <div className={"signup-container"}>
            <Form noValidate validated={isValidated} className={'signup-box'} onSubmit={submitformHandler}>
                <h2>Signup</h2>
                <FloatingLabel controlId="name" label="Name" className="mb-2">
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        required
                        ref={nameref}
                        isInvalid={!validateName}
                        className="border-dark border-1 text-dark"
                    />
                    <Form.Control.Feedback type='invalid' >
                        Please provide a valid name.
                    </Form.Control.Feedback>
                </FloatingLabel>
                
                <FloatingLabel controlId="email" label="Email" className="mb-2">
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

                <FloatingLabel controlId="phoneno" label="Phone No" className="mb-2">
                    <Form.Control
                        type="tel"
                        placeholder="Phone No"
                        ref={phonenoref}
                        isInvalid={!validatePhoneno}
                        className="border-dark border-1 text-dark"
                    />
                    <Form.Control.Feedback type='invalid'>
                        Please provide a valid phone number.
                    </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel controlId="password" label="Password" className="mb-2">
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
                    <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long.
      </Form.Text>
      
                </FloatingLabel>

                <FloatingLabel controlId="conformPassword" label="Confirm Password" className="mb-2">
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        ref={conformpasswordref}
                        isInvalid={!validateCPassword}
                        className="border-dark border-1 text-dark"
                    />
                    
                    <Form.Control.Feedback type='invalid'>
                        Passwords do not match.
                    </Form.Control.Feedback>
                </FloatingLabel>

                {isOtpSent && (
                    <FloatingLabel controlId="otp" label="OTP" className="mb-2">
                        <Form.Control
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="border-dark border-1 text-dark"
                        />
                        <Form.Text id="OTPHelpBlock" muted>
        Enter Your OTP From Your Email
      </Form.Text>
                    </FloatingLabel>
                )}

                <div className="d-flex justify-content-center">
                    {!isOtpSent ? (
                        <Button className="btn-primary btn-lg" type="submit">Send OTP</Button>
                    ) : (
                        <Button className="btn-primary btn-lg" onClick={verifyOtpHandler}>Verify OTP</Button>
                    )}
                </div>
            </Form>
        </div>
    );
}

export default Signup;
