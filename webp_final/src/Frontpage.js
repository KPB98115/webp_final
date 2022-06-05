import { useState } from "react";
import { Button, Container, } from "react-bootstrap";
import Logo from "./image/Logo.js";
import Post from "./Post.js";

function Main() {
    return (
        <Container>
            <div id="header">
                <div id="web-logo"><h1>Fake IG</h1></div>
                <div id="search_bar">
                    <img src={Logo.search} alt="search logo" height="25px" width="25px"/>
                    <input type="text" placeholder="search user"></input>
                </div>
                <div id="netvigator">
                    <img src={Logo.homepage} alt="search" height="30px" width="30px"/>
                    <img src={Logo.newPost} alt="search" height="30px" width="30px"/>
                    <img src={Logo.profile} alt="search" height="30px" width="30px"/>
                </div>
            </div>
            <hr />
            <div id="content">
                <div id="gallery">
                    <Post />
                </div>
                <div id="fd-list">
                    Poor boy you have no friends.
                </div>
            </div>
        </Container>
    );
}

export default Main;