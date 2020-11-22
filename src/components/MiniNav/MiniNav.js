import React from "react";
import "./MiniNav.css";
import Logo from "../Logo/Logo";

const MiniNav = ({
    onSignInFormClick,
    onSignUpFormClick,
    route,
    onRouteChange,
    isSignedIn,
    setisSignedIn,
    user,
}) => {
    return (
        <div>
            <nav className="flex justify-between b--white-10  mb5">
                <div className="link white-70 hover-white no-underline flex items-center pa3">
                    <Logo />
                </div>
                <div className="flex-grow pa3 flex items-center">
                    <div className="f6 link dib white dim mr3 mr4-ns pointer">
                        About
                    </div>
                    {!isSignedIn ? (
                        <div>
                            <div
                                className="f6 link dib white dim mr3 mr4-ns pointer"
                                onClick={() => onSignInFormClick()}
                            >
                                Sign In
                            </div>
                            <div
                                className="pointer f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20"
                                onClick={() => onSignUpFormClick()}
                            >
                                Sign Up
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div
                                className="f6 link dib white dim mr3 mr4-ns pointer"
                                onClick={() => {
                                    onRouteChange("signout");
                                    setisSignedIn(false);
                                }}
                            >
                                Sign Out
                            </div>
                            <div className="f6 dib white bg-animate hover-bg-white hover-black no-underline pv2 ph4 br-pill ba b--white-20">
                                {`Hi ${user.name}!`}
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default MiniNav;
