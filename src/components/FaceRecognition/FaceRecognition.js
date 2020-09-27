import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, box }) => {
    const faceBoxList = box.map((child, i) => {
        return (
            <div
                key={i}
                className="bounding-box"
                style={{
                    top: child.topRow,
                    bottom: child.bottomRow,
                    left: child.leftCol,
                    right: child.rightCol,
                }}
            ></div>
        );
    });

    return (
        <div className="center ma">
            <div className="absolute mt2">
                {imageURL ? (
                    <img
                        id="inputimage"
                        className="pa3, mt1 ma3 br3"
                        style={{ width: "700px", height: "auto" }}
                        src={imageURL}
                        alt=" "
                    />
                ) : null}

                {faceBoxList}
                {box.length < 1 ? (
                    console.log("no faces present")
                ) : (
                    <div className="f3 number bold">
                        <div className="white">
                            {`${box.length} face${box.length === 1 ? "" : "s"}`}{" "}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FaceRecognition;
