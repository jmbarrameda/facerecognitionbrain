import React, { useState } from "react";
import "./form.css";
import lb from "../Logo/logo.png";

const Login = ({
    onSignInFormClick,
    onRouteChange,
    loadUser,
    setisSignedIn,
}) => {
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");

    const onSignInEmailChange = (event) => {
        setSignInEmail(event.target.value);
    };

    const onSignInPasswordChange = (event) => {
        setSignInPassword(event.target.value);
    };

    async function onSignInClick() {
        await fetch("https://shielded-tundra-88447.herokuapp.com/signin", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email: signInEmail,
                password: signInPassword,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.id) {
                    loadUser(data);
                    setisSignedIn(true);
                    onRouteChange("signin");
                } else {
                    alert("Wrong email or password");
                }
            });
    }

    return (
        <div className="main-form">
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
                        <input
                            type="email"
                            id="email"
                            onChange={onSignInEmailChange}
                        />
                    </div>
                    <div className="element">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={onSignInPasswordChange}
                        />
                    </div>
                    <div className="element">
                        <button
                            className="bg-light-purple"
                            onClick={() => {
                                // onRouteChange("signin");
                                onSignInClick();
                                onSignInFormClick();
                            }}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
