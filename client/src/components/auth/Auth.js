import React, {useState} from 'react'
import styled from "styled-components"
import Cookies from "universal-cookie"
import axios from "axios"

const cookies = new Cookies()

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState)
    const [isSignup, setIsSignup] = useState(true)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
    }

    return (
        <AuthFormContainer>
            <FormFields>
                <FieldContent>
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <FieldContentInput>
                                <label htmlFor="fulllName">Full Name</label>
                                <input name="fullName" type="text" placeholder="Full Name" onChange={handleChange} required/>
                            </FieldContentInput>
                        )}
                        <FieldContentInput>
                            <label htmlFor="username">Username</label>
                            <input name="username" type="text" placeholder="Username" onChange={handleChange} required/>
                        </FieldContentInput>
                        {isSignup && (
                            <FieldContentInput>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input name="phoneNumber" type="text" placeholder="Phone Number" onChange={handleChange} required/>
                            </FieldContentInput>
                        )}
                        {isSignup && (
                            <FieldContentInput>
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input name="avatarURL" type="text" placeholder="Avatar URL" onChange={handleChange} required/>
                            </FieldContentInput>
                        )}
                        <FieldContentInput>
                            <label htmlFor="password">Password</label>
                            <input name="password" type="password" placeholder="Password" onChange={handleChange} required/>
                        </FieldContentInput>
                        {isSignup && (
                            <FieldContentInput>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required/>
                            </FieldContentInput>
                        )}
                        <FieldContentButton>
                            <button>
                                {isSignup ? "Sign Up" : "Sign In"}
                            </button>
                        </FieldContentButton>
                    </form>
                    <FieldAccount>
                        <p>
                            {isSignup ? "Already have an account" : "Don't have an account?"}
                        </p>
                        <span onClick={switchMode}>
                            {isSignup ? "Sign In": "Sign Up"}
                        </span>
                    </FieldAccount>
                </FieldContent>
            </FormFields>
            <BgImage />
        </AuthFormContainer>
    )
}

const AuthFormContainer = styled.div`
height: 100vh;
`;

const BgImage = styled.div`
height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("/assets/signupbg.jpg");
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
`;

const FormFields = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-right: 0px;
padding: 2rem;
background: rgba(255, 255, 255, 0.05);
box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
backdrop-filter: saturate(180%) blur(10px);
height: 91%;
width: 40%;
margin-right: 0;
margin-left: auto;
`;

const FieldContent = styled.div`
padding: 2rem;
box-shadow: 0px 1px 5px rgb(0 0 0 / 10%);
border-radius: 5px;
transition: 0.8s ease;
background: #fff;
width: 70%;
p {
    font-size: 1.5rem;
    color: rgb(13, 17, 19);
    font-weight: 700;
}
`;

const FieldContentInput = styled.div`
display: flex;
flex-direction: column;
margin: 1rem 0rem;
label {
    margin-bottom: 0.45rem;
    color: rgb(61, 79, 88);
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 0.7px;
    line-height: 1.3;
}
input {
    padding: 0.55rem 0.4rem;
    border: 1px solid rgb(184, 196, 194);
    border-radius: 4px;
    font-size: 14px;
    outline: none;
    transition: all 150ms ease-in-out 0s;
    width: 85%;
    background: #fff;
}
`;

const FieldAccount = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
margin-top: 0.2rem;
p {
    font-size: 14px;
    color: #000;
    font-weight: 500;
    margin-right: 0.5rem;
}
span {
    color: rgb(13, 17, 19);
    cursor: pointer;
    font-weight: 700;
}
`;

const FieldContentButton = styled.div`
margin-top: 2rem;
display: flex;
justify-content: flex-start;
button {
    border-radius: 4px;
    background-color: rgb(13, 17, 19);
    border: none;
    color: #fff;
    font-weight: 500;
    padding: 0.7rem 1.2rem;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
        background: rgb(29, 39, 43);
    }
}
`;

export default Auth
