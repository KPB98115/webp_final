import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react"
import * as firebase from "./firebase.js";

function NewPost() {
    const [file, setFile] = useState();
    const [uploaded, setUploaded] = useState(false);
    const [url, setUrl] = useState("");

    function handleUpload(event) {
        setFile(event.target.files[0]);
        previewIMG(event.target.files[0]);
    }

    function submitUpload() {
        firebase.newPost();
    }

    function previewIMG(img) {
        try {
            const image = document.getElementById("preview_img");
            image.src = URL.createObjectURL(img);
            setUrl(URL.createObjectURL(img));
        }
        catch(e) {
            document.getElementById("exception").innerText = "Something bad happened, please try again.";
        }
    }

    return (
        <div id="new_post_form_bg">
            <div id="form_container">
                <div id="preview">
                    <img id="preview_img" alt="preview"/>
                    <p id="exception"></p>
                </div>
                <Form>
                    <Form.Group className="mb-3" controlId="formNewPost">
                        <Form.Label>Select image: </Form.Label>
                        <Form.Control type="file" accept="image/jpg" name="image" onChange={handleUpload}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Caption: </Form.Label>
                        <Form.Control type="text" placeholder="Anything want to share?" />
                    </Form.Group>
                    <Button variant="primary" onClick={submitUpload}>Submit</Button>
                </Form>
            </div>
        </div>
    );
}

export default NewPost;