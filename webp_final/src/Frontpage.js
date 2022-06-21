import { Container, } from "react-bootstrap";
import Logo from "./image/Logo.js";
import Gallery from "./Gallery.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as firebase from "./firebase.js";
import { useState, Suspense } from "react";
import { async } from "@firebase/util";
import FriendList from "./FriendList.js";

/**
 * const auth = getAuth();
 * onAuthStateChanged(auth, callback => user_meta);
const displayname = user.displayName;
const username = user.email;
const userID = user.uid;
 */


function Main() {
    const [postGallery, setPostGallery] = useState([]);
    
    firebase.getPostAmount().then((list) => {
        setPostGallery(list); //contain post ID
    })
    
    return (
        <Container>
            <div id="content">
                <div id="gallery">
                    <Gallery gallery={postGallery}/>
                </div>
                <div id="fd-list">
                    <FriendList />
                </div>
            </div>
        </Container>
    );
}

export default Main;