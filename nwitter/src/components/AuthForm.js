import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {name,value} = event.target;
        if ( name === "email") {
            setEmail(value);
        } else if( name === "password"){
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
            const auth = getAuth();
            if(newAccount){
                //새 계정 생성
                data = await createUserWithEmailAndPassword(auth,email,password)
            } else {
                //로그인
                data = await signInWithEmailAndPassword(auth,email,password)
            }
        } catch(error){
            setError(error.message);
        }
    }
    
    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <>
            <form onSubmit={onSubmit} className="container-inner login-inner">
                <input 
                    name="email"
                    type="text"
                    placeholder="Email"
                    required value={email}
                    onChange ={onChange}
                    className="authInput"
                />
                <input
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    required value={password}
                    onChange ={onChange}
                    className="authInput"
                    
                />
                <input type="submit" value={newAccount ? "새 계정 만들기" : "로그인"} className="authInput loginBtn"/>
                {error && <span className="error-text">{error}</span>}
            </form>
            <span onClick ={toggleAccount} className="loginOption">
                {newAccount ? "로그인하기" : "회원가입하기"}
            </span>
        </>
    );
}
export default AuthForm;