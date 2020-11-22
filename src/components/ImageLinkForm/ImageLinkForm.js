import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onSubmit, onRandomSubmit }) => {
    return (
        <div>
            <p className="deets">
                {
                    "Try inserting an image URL and see how many faces are present"
                }
            </p>
            <div className="center ">
                <div className="form pa4 br3 shadow-5 center bg-white-20">
                    <input
                        className="f4 pa2 w-60 center but"
                        type="text"
                        onChange={(event) => onInputChange(event)}
                        placeholder="insert image url here"
                    />
                    <button
                        className="tc w-20 grow link pv2 dib white bg-blue but"
                        onClick={() => onSubmit()}
                    >
                        Detect
                    </button>
                    <button
                        className="tc w-20 grow link pv2 dib white bg-blue but"
                        onClick={() => onRandomSubmit()}
                    >
                        Random
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;
