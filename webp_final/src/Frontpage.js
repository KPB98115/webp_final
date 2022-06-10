import { Container, } from "react-bootstrap";
import Logo from "./image/Logo.js";
import Post from "./Post.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import * as firebase from "./firebase.js";
import { useState } from "react";
import { async } from "@firebase/util";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    try {
        const displayname = user.displayName;
        const username = user.email;
        const userID = user.uid;

        
        //firebase.register(username, userID);
        //firebase.newPost(username, "test3", Logo.cgu, "test");
        //firebase.commentReply(username, "hello world", "zjYWRuzKavBlNXm7YMZs");
        //firebase.getPostInfo("zjYWRuzKavBlNXm7YMZs"); //It return firestore timestamp object, use toDate to convert to JS Data object.
    } catch (error) {
        console.log("user has no longer logged-in", error);
    }
    
});



function Main() {

    const [postAmount, setPostAmount] = useState(0);

    firebase.getPostAmount().then(value => {
        return ;
    })
    
    
    return (
        <Container>
            <div id="content">
                <div id="gallery">
                    {postAmount}
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