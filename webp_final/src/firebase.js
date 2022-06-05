// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8FMwdJF58Nj0GHbBN4oAEjC-ztp-td1I",
  authDomain: "webp-final-5e5d5.firebaseapp.com",
  projectId: "webp-final-5e5d5",
  databaseURL: "gs://webp-final-5e5d5.appspot.com",
  storageBucket: "webp-final-5e5d5.appspot.com",
  messagingSenderId: "868651144863",
  appId: "1:868651144863:web:7999f70774f598efe4f4aa"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const firestore = app.firestore();

const storage = app.getStorage();

const imageDict = ref(storage, "webp_final/image");


function register(username, password) {
    var data = {
        username: username,
        password: password
    };
    firestore.collection("ACL").doc("user").set(data).then(() => {
        console.log("New member "+"username"+" register successfully.")
    }).catch(error => {
        console.log(error);
    });
}

function uploadIMG(filename, img) {
    uploadBytes(imageDict, img).then(snapshot => {
        console.log("image upload successfully.");
        console.log(snapshot);
    });
    return "gs://webp-final-5e5d5.appspot.com/webp_final/image/"+filename;
}

function newPost(username, img, caption, timestamp) {
    const url = uploadIMG(username, img);
    firebase.collection("gallery").doc("post").update({
        "username": username,
        "img_URL": url,
        "caption": caption,
        "timestamp": timestamp
    });
}