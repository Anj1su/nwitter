import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const Navigation = ({ userObj }) => (
    <div className="nav">
        <ul>
            <li>
                <Link to="/" className="home">
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                </Link>
            </li>
            <li>
                <Link to="/profile" className="profile">
                    <span className="mainText" >
                        {userObj.displayName
                        ? `${userObj.displayName} 님 Profile`
                        : "Profile"}
                    </span>
                </Link>
            </li>
        </ul>
    </div>
);

export default Navigation;