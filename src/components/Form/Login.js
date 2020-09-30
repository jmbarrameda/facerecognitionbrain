import React from "react";
import "./form.css";
import lb from "../Logo/logo.png";

const Login = ({ onSignInFormClick }) => {
    return (
        <div className="main-form">
            {/* <div className="center-click">
                <button onclick="onFormClick()">Login</button>
            </div> */}
            <div className="popup-overlay"></div>

            <div className="popup">
                <div
                    className="popup-close"
                    onClick={() => onSignInFormClick()}
                >
                    &times;
                </div>
                <div className="login">
                    <div className="avatar">
                        {/* <img src="https://bit.ly/31pHqJb" alt="" /> */}
                        <img src={lb} alt="" />
                    </div>
                    <div className="header">Member login</div>
                    <div className="element">
                        <label htmlFor="email">email</label>
                        <input type="email" id="email" />
                    </div>
                    <div className="element">
                        <label for="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="element">
                        <button className="bg-light-purple">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
