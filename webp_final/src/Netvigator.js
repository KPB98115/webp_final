import { Container } from "react-bootstrap";
import Logo from "./image/Logo";
import { Button, Form, Label } from "react-bootstrap";
import { useState, useEffect } from "react";
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import * as firebase from "./firebase.js";
import Gallery from "./Gallery";
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

    const [form, setForm] = useState();
    const [profile, setProfile] = useState();

    var fileName;
    const [caption, setCaption] = useState("");
    const [file, setFile] = useState();
    const [uploaded, setUploaded] = useState(false);


    function handleUpload(event) {
        const files = event.target.files;
        console.log("flag", files[0]);
        setFile(files[0]);
        
        if (files.length) {
            previewIMG(files);

            fileName = files.name;
        }
        else console.log("file length is empty.");
    }
    
    function previewIMG(files) {
        try {
            if (files) {
                const reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.addEventListener("load", () => {
                    document.getElementById("preview_img").src = reader.result;
                }, false);
            }
            else {
                document.getElementById("#exception").innerText = "Something bad happened, please try again.";
            }
        }
        catch(e) {
            console.log(e);
            document.getElementById("#exception").innerText = "Something bad happened, please try again.";
        }
    }
    
    function submitUpload() {
        if (!props) {
            const caption = document.getElementById("form_caption").value;
            setCaption(caption);
    
            if (file) {
                try {
                    firebase.newPost(props.user.email, fileName, file, caption);
                    setUploaded(true);
                }
                catch(e) {
                    console.log(e);
                }
                setUploaded(false);
    
            }
            else {
                console.log(file);
                alert("No image selected.");
            }
        }
        else return;
    }
    useEffect(() => {
        if (uploaded) {
            console.log("flag");
            setForm();
        }
        else console.log("no effect.");
    }, [uploaded]);

    function postForm() {
        const form_template = (
            <div id="new_post_form_bg" onClick={()=>{setForm()}}>
            <div id="form_container" onClick={(event)=>{event.stopPropagation()}}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Select image: </Form.Label>
                        <Form.Control type="file" accept="image/jpg" name="image" onChange={handleUpload}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Caption: </Form.Label>
                        <Form.Control id="form_caption" type="text" placeholder="Anything want to share?"/>
                    </Form.Group>
                    <Button style={{display: "inline"}} variant="primary" onClick={submitUpload}>Submit</Button>
                </Form>
                <div id="preview">
                    <img id="preview_img" alt=" " src=""/>
                    <p id="exception"></p>
                </div>
            </div>
        </div>
        );
        setForm(form_template);
    }

    const [postGallery, setPostGallery] = useState([]);

    firebase.getPostAmount().then((list) => {
        setPostGallery(list); //contain post ID
    })
    
    function userProfile() {
        var profile_post_gallery  = [];

        for (var post in postGallery) {
            for (var preporities in post) {
                if (preporities.userid !== props.user.id) {
                    profile_post_gallery.push(post);
                }
            }
        }

        const profile_template = (
            <div id="profile_block_bg" onClick={()=>{setProfile()}}>
                <div id="profile_container" onClick={(event)=>{event.stopPropagation()}}>
                    <div id="profile_info">
                        <div className="profile_title">Username: <p id="profile_username">{props.user.displayName}</p></div>
                        <div className="profile_title">Email address: <p id="profile_email">{props.user.email}</p></div>  
                        <Button variant="outline-success" onClick={logout}>Log-out</Button>
                    </div>
                    <div id="profile_gallery">
                        <Gallery post={profile_post_gallery}/>
                    </div>
                </div>
            </div>
        )
        setProfile(profile_template);
    }

    return (
        <Container>
            <div id="header">
                <div id="web-logo"><h1>Fake IG</h1></div>
                <div id="currentUser"><h3 style={{display: "inline"}}>Hello!  </h3>{props ? props.user.displayName : ""}</div>
                <div id="search_bar">
                    <img src={Logo.search} alt="search logo" height="25px" width="25px" />
                    <input type="text" placeholder="search user"></input>
                </div>
                <div id="netvigator">
                    <img src={Logo.homepage} alt="home page" id="homepage_btn" height="30px" width="30px" />
                    <img src={Logo.newPost} alt="new post" id="new-post_btn" onClick={postForm} height="30px" width="30px" />
                    <img src={Logo.profile} alt="profile" id="profile-btn" onClick={userProfile} height="30px" width="30px" />
                    <Button variant="outline-success" id="log_btn" onClick={props.auth ? logout : login}>{props.auth ? "Log-out" : "Log-in"}</Button>
                </div>
            </div>
            {form}{profile}
            <hr />
        </Container>
    );
}

export default Netvigator;