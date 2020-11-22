import React, { useState } from "react";
import "./form.css";
import lb from "../Logo/logo.png";

const Login = ({
    onSignUpFormClick,
    onRouteChange,
    loadUser,
    setisSignedIn,
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    };

    async function onSubmit() {
        await fetch("https://shielded-tundra-88447.herokuapp.com/register", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.id) {
                    loadUser(data);
                    setisSignedIn(true);
                    onRouteChange("signin");
                } else {
                    alert("Don't leave an empty field");
                }
            });
    }

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
                        <input type="name" id="name" onChange={onNameChange} />
                    </div>
                    <div className="element">
                        <label htmlFor="email">email</label>
                        <input
                            type="email"
                            id="email"
                            onChange={onEmailChange}
                        />
                    </div>
                    <div className="element">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={onPasswordChange}
                        />
                    </div>
                    <div className="element">
                        <button
                            className="bg-light-purple"
                            onClick={() => {
                                onSubmit();
                                // onRouteChange("signout");
                                onSignUpFormClick();
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
