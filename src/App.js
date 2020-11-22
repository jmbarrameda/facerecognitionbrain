import React, { useState } from "react";
import Clarifai from "clarifai";
// import Navigation from "./components/Navigation/Navigation";
// import Logo from "./components/Logo/Logo";
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
import "animate.css";

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

// const app = new Clarifai.App({
//     apiKey: ClarifaiApiKey,
// });



function App() {
    const [input, setInput] = useState(
        "https://d30i16bbj53pdg.cloudfront.net/wp-content/uploads/2015/04/Study-Group-web.jpeg"
    );
    const [imageURL, setImageURL] = useState("");
    const [box, setBox] = useState([]);
    const [randImg] = useState(Images);
    const [signInVisible, setSignInVisible] = useState(false);
    const [signUpVisible, setSignUpVisible] = useState(false);
    const [route, setRoute] = useState("signout");
    const [isSignedIn, setisSignedIn] = useState(false);
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
    });

    const initialState = () => {
        setImageURL("");
        setBox([]);
        setSignInVisible(false);
        setSignUpVisible(false);
        setRoute("signout");
        setisSignedIn(false);
        setUser({
            id: "",
            name: "",
            email: "",
            entries: 0,
            joined: "",
        })
    }

    const loadUser = (data) => {
        console.log(data);
        setUser({
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined,
        });
    };

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

    const onSubmit = (isRandom) => {
        setImageURL(input);
        fetch("https://shielded-tundra-88447.herokuapp.com/imageUrl", {
                method: "post",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    input: input
                })
            }).then((response) => response.json())
            .then((response) => {
                console.log(response);
                if (isSignedIn && !isRandom) {
                    fetch("https://shielded-tundra-88447.herokuapp.com/image", {
                        method: "put",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify({
                            id: user.id,
                        }),
                    })
                        .then((response) => response.json())
                        .then((entry) => {
                                setUser({ ...user, entries: entry });
                        }).catch(console.log)
                }

                 displayFaceBox(calculateFaceLocation(response));
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const onRandomSubmit = () => {
        const randNum = Math.floor(Math.random() * randImg.length);
        const image = randImg[randNum];
        setInput(image);
        onSubmit(true);
    };

    const onSignInFormClick = () => {
        setSignInVisible(!signInVisible);
    };

    const onSignUpFormClick = () => {
        setSignUpVisible(!signUpVisible);
    };

    const onRouteChange = (route) => {
        if (route === "signout") {
            initialState();
            setisSignedIn(false);
        } else if (route === "signin") {
            setisSignedIn(true);
        }
        setRoute(route);
    };

    return (
        <div className="App">
            <Particles className="particle" params={particleOptions} />

            <MiniNav
                route={route}
                onRouteChange={onRouteChange}
                onSignInFormClick={onSignInFormClick}
                onSignUpFormClick={onSignUpFormClick}
                isSignedIn={isSignedIn}
                setisSignedIn={setisSignedIn}
                user={user}
            />
            {signInVisible && (
                <Login
                    onRouteChange={onRouteChange}
                    onSignInFormClick={onSignInFormClick}
                    loadUser={loadUser}
                    setisSignedIn={setisSignedIn}
                />
            )}
            {signUpVisible && (
                <Register
                    onSignUpFormClick={onSignUpFormClick}
                    onRouteChange={onRouteChange}
                    loadUser={loadUser}
                    setisSignedIn={setisSignedIn}
                />
            )}
            <Rank route={route} isSignedIn={isSignedIn} user={user} />
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
