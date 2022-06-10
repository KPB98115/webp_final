import { Container } from "react-bootstrap";
import Logo from "./image/Logo";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import * as firebase from "./firebase.js";
//import LoginForm from './Login';
//import Profile from "./Profile";
//import Newpost from "./Newpost";

function Netvigator(props) {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    async function logout() {
        console.log("log-out invoked.", props.auth);
        try {
            await signOut(auth);
            console.log("Log-out successfully.");
        } catch (error) {
            console.log("Log-out unsuccessfully.", error);
        }
    }

    function login() {
        console.log("log-in invoked.", props.auth);
        signInWithPopup(auth, provider);
        //window.location.reload();
    }

    function addtest() {
        firebase.newPost(auth.currentUser.email, "test3", Logo.cgu, "test3");
    }


    return (
        <Container>
            <div id="header">
                <div id="web-logo"><h1>Fake IG</h1></div>
                <div id="search_bar">
                    <img src={Logo.search} alt="search logo" height="25px" width="25px" />
                    <input type="text" placeholder="search user"></input>
                </div>
                <div id="netvigator">
                    <img src={Logo.homepage} alt="home page" id="homepage_btn" height="30px" width="30px" />
                    <img src={Logo.newPost} alt="new post" id="new-post_btn" onClick={addtest} height="30px" width="30px" />
                    <img src={Logo.profile} alt="profile" id="profile-btn" height="30px" width="30px" />
                    <Button variant="outline-success" id="log_btn" onClick={props.auth ? logout : login}>{props.auth ? "Log-out" : "Log-in"}</Button>
                </div>
            </div>
            <hr />
        </Container>
    );
}

export default Netvigator;