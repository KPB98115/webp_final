import { useState } from "react";
import { Button, Container, } from "react-bootstrap";
import Logo from "./image/Logo.js";

function Main() {
    return (
        <Container>
            <div id="header">
                <h1>Fake IG</h1>
                <div id="search_bar">
                    <img src={Logo.search} alt="search logo" height="25px" width="25px"/>
                    <input type="text" class="" placeholder="search user"></input>
                </div>
                <div id="netvigator">
                    <img src={Logo.homepage} alt="search" height="30px" width="30px"/>
                    <img src={Logo.newPost} alt="search" height="30px" width="30px"/>
                    <img src={Logo.profile} alt="search" height="30px" width="30px"/>
                </div>
            </div>
            <hr />
            
        </Container>
    );
}

function click() {}

export default Main;