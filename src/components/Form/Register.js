import React from "react";
import "./form.css";
import lb from "../Logo/logo.png";

const Login = ({ onSignUpFormClick }) => {
    return (
        <div className="main-form">
            {/* <div className="center-click">
                <button onclick="onFormClick()">Login</button>
            </div> */}
            <div className="popup-overlay"></div>
            <div className="popup register">
                <div
                    className="popup-close"
                    onClick={() => onSignUpFormClick()}
                >
                    &times;
                </div>
                <div className="login">
                    <div className="avatar">
                        {/* <img src="https://bit.ly/31pHqJb" alt="" /> */}
                        <img src={lb} alt="" />
                    </div>
                    <div className="header">Member Register</div>
                    <div className="element">
                        <label htmlFor="name">name</label>
                        <input type="name" id="name" />
                    </div>
                    <div className="element">
                        <label htmlFor="email">email</label>
                        <input type="email" id="email" />
                    </div>
                    <div className="element">
                        <label for="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="element">
                        <button className="bg-light-purple">Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
