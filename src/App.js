import React, { useState } from "react";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-particles-js";
import "./App.css";
import MiniNav from "./components/MiniNav/MiniNav";
import { ClarifaiApiKey } from "./api_keys/api_keys";
import { Images } from "./Images";
import Login from "./components/Form/Login";
import Register from "./components/Form/Register";

const particleOptions = {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        interactivity: {
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse",
                },
            },
        },
    },
};

const app = new Clarifai.App({
    apiKey: ClarifaiApiKey,
});

function App() {
    const [input, setInput] = useState(
        "https://d30i16bbj53pdg.cloudfront.net/wp-content/uploads/2015/04/Study-Group-web.jpeg"
    );
    const [imageURL, setImageURL] = useState("");
    const [box, setBox] = useState([]);
    const [randImg, setRandImg] = useState(Images);
    const [signInVisible, setSignInVisible] = useState(false);
    const [signUpVisible, setSignUpVisible] = useState(false);

    const onInputChange = (event) => {
        setInput(event.target.value);
    };

    const calculateFaceLocation = (data) => {
        /* jaycee code */
        const regions = data.outputs[0].data.regions;
        /* jaycee end code*/
        const image = document.getElementById("inputimage");
        const width = Number(image.width);
        const height = Number(image.height);

        if (regions !== undefined) {
            const faces = regions.map((region) => {
                const box = region.region_info.bounding_box;
                return {
                    leftCol: box.left_col * width,
                    topRow: box.top_row * height,
                    rightCol: width - box.right_col * width,
                    bottomRow: height - box.bottom_row * height,
                };
            });

            return faces;
        }
        return [];
    };

    const displayFaceBox = (boxData) => {
        setBox(boxData);
    };

    const onSubmit = () => {
        setImageURL(input);
        app.models
            .initModel({
                id: Clarifai.FACE_DETECT_MODEL,
            })
            .then((generalModel) => {
                return generalModel.predict(input);
            })
            .then((response) => {
                displayFaceBox(calculateFaceLocation(response));
            })
            .catch((err) => console.log(err));
    };

    const onRandomSubmit = () => {
        const randNum = Math.floor(Math.random() * randImg.length);
        const image = randImg[randNum];
        setInput(image);
        onSubmit();
    };

    const onSignInFormClick = () => {
        setSignInVisible(!signInVisible);
    };

    const onSignUpFormClick = () => {
        setSignUpVisible(!signUpVisible);
    };
    return (
        <div className="App">
            <Particles className="particle" params={particleOptions} />

            <MiniNav
                onSignInFormClick={onSignInFormClick}
                onSignUpFormClick={onSignUpFormClick}
            />
            {signInVisible ? (
                <Login onSignInFormClick={onSignInFormClick} />
            ) : null}
            {signUpVisible ? (
                <Register onSignUpFormClick={onSignUpFormClick} />
            ) : null}
            {/* <Navigation /> */}
            {/* <Logo /> */}
            <Rank />
            <ImageLinkForm
                onInputChange={onInputChange}
                onSubmit={onSubmit}
                onRandomSubmit={onRandomSubmit}
            />

            <FaceRecognition box={box} imageURL={imageURL} />
        </div>
    );
}

export default App;
