import { authService, firebaseInstance } from "myBase";
import React from "react";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

//import Auth
const Auth = () => {

    //소셜미디어로 로그인하기
    const onSocialClick = async (event) => {
        const {
            target: {name},
        } = event;

        let provider;
        if(name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        await authService.signInWithPopup(provider);
    }

    return (
        <div className="socialBtn-Container">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#1097ff"}
                size="3x"
            />
            <AuthForm />
            <div className="socialBtn-area">
                <button onClick={onSocialClick} name="google" className="socialBtn googleBg">
                    <FontAwesomeIcon icon={faGoogle} color={"#fff"}/>
                </button>
                <button onClick={onSocialClick} name="github" className="socialBtn">
                    <FontAwesomeIcon icon={faGithub} className="fa-Github"/>
                </button>
            </div>
        </div>
    );
}
export default Auth;