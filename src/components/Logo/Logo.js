import React from "react";
import Tilt from "react-tilt";
import lb from "./logo.png";
import "./Logo.css";

const Logo = () => {
    return (
        <div className="]">
            <Tilt
                className="Tilt br2 shadow-2"
                options={{ max: 50 }}
                style={{ height: 40, width: 40 }}
            >
                <div className="Tilt-inner">
                    <img
                        style={
                            {
                                /* paddingTop: "1px" */
                            }
                        }
                        src={lb}
                        alt="logo"
                    />
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;
