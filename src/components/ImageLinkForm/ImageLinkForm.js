import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div>
            <p className="f3">
                {"Try inserting an image and see how many faces are present"}
            </p>
            <div className="center">
                <div className="form pa4 br3 shadow-5 center">
                    <input
                        className="f4 pa2 w-70 center"
                        type="text"
                        onChange={(event) => onInputChange(event)}
                    />
                    <button
                        className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                        onClick={() => onSubmit()}
                    >
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;
