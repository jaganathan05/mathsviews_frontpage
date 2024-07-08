import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "axios";
import classes from './Signup.module.css';
import './a.css'
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

    const sendOtpHandler = async () => {
        const EnteredEmail = emailref.current.value;
        setEmailForOtp(EnteredEmail);

        try {
            const response = await axios.post('http:localhost:8082/send-otp', { email: EnteredEmail });
            if (response.data.success) {
                setIsOtpSent(true);
                alert('OTP sent to your email');
            } else {
                alert('Failed to send OTP');
            }
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
        const EnteredEmail = emailref.current.value;
        const EnteredPassword = passwordref.current.value;
        const conformpassword = conformpasswordref.current.value;

        if (EnteredPassword !== conformpassword) {
            alert('Password mismatch');
            setValidated(false);
            return;
        }

        if (!isOtpSent) {
            sendOtpHandler();
        }
    };

    return (
        <div className={classes["signup-container"]}>
            <Form validated={isValidated} className={classes['signup-box']} onSubmit={submitformHandler}>
                <h2>Signup</h2>
                <FloatingLabel controlId="name" label="Name" className="mb-4" >
                    <Form.Control type="text" placeholder="Name" required ref={nameref} />
                </FloatingLabel>
                <FloatingLabel controlId="email" label="Email" className="mb-4">
                    <Form.Control type="email" placeholder="Email" required ref={emailref} />
                </FloatingLabel>
                <FloatingLabel controlId="phoneno" label="Phone No" className="mb-4">
                    <Form.Control type="tel" placeholder="Phone No" ref={phonenoref} />
                </FloatingLabel>
                <FloatingLabel controlId="password" label="Password" className="mb-4">
                    <Form.Control type="password" placeholder="Password" ref={passwordref} />
                </FloatingLabel>
                <FloatingLabel controlId="conformPassword" label="Conform Password" className="mb-4">
                    <Form.Control type="password" placeholder="Conform Password" ref={conformpasswordref} />
                </FloatingLabel>

                {isOtpSent && (
                    <FloatingLabel controlId="otp" label="OTP" className="mb-4">
                        <Form.Control
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
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
