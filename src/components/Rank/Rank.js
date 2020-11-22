import React from "react";
import "./Rank.css";

const Rank = ({ isSignedIn, route, user }) => {
    return (
        <div>
            {/* <div className="white f3">{`hi User! You are rank...`}</div>
            <div className="white f1">{`#5`}</div> */}
            {isSignedIn ? (
                <div>
                    <div className="white rank">{`Hi ${user.name}! Your current entry count is...`}</div>
                    <div className="white f1">{`${user.entries}`}</div>
                </div>
            ) : (
                <div className="white rank">{`Welcome to FaceRecognitionBrain!`}</div>
            )}
        </div>
    );
};

export default Rank;
