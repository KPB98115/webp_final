// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import { app } from "./firebaseInit";
import { getFirestore, collection, doc, setDoc, addDoc, updateDoc, getDoc, getDocs, serverTimestamp, arrayUnion, Timestamp, query, deleteDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
//const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

async function register(username, userID) {
    try {
        await setDoc(doc(db, "ACL", username), {
            userID: userID,
            lastOnline: serverTimestamp()
        });
        console.log("New user register successfully, userID : ", userID);
        return userID;
    } catch (error) {
        console.log(error);
    }
}

function uploadIMG(filename, img) {
    const imageDict = ref(storage, `webp_final/image/${filename}`);

    try {
        const uploadTask = uploadBytesResumable(imageDict, img, {contentType: "image/jpg"});

        uploadTask.on("state_changed", (snapshot) => {
            console.log("拍攝此快照時已傳輸的總字節數: "+snapshot.bytesTransferred);
            console.log("預計上傳的總字節數: "+snapshot.totalBytes);
        }, (error) => {
            console.log(error);
        });
        return getDownloadURL(uploadTask.snapshot.ref); //return a callback function
    } catch (error) {
        console.log(error);
    }
}

async function newPost(username, filename, img, caption) {
    console.log("query started.");
    try {
        const url = await uploadIMG(filename, img); //since it's a callback function, use await to retrieve the url
        console.log("image uploaded.", url);

        const docRef = await addDoc(collection(db, "post"), {
            username: username,
            img_URL: url,
            like_amount: 0,
            comments: {},
            caption: caption,
            timestamp: serverTimestamp()
        });
        console.log("New post create successfully, post id: "+docRef.id);
        return [docRef.id, url]; //return dec.id and image url as an array
    } catch (error) {
        console.log(error);
        return false;
    }
}

function deletePost(postID) {
    try {
        const response = deleteDoc(doc(db, "post", postID));
        console.log(response);
    }
    catch(e) {
        console.log(e);
    }
}

async function commentReply(username, comment, postID) {
    const timestamp = Timestamp.now();
    try {
        await updateDoc(doc(db, "post", postID), {
            comments: arrayUnion({
                comment: comment,
                username: username,
                timestamp: timestamp
            })
        })
        console.log("comment reply successfully.");
    } catch (error) {
        console.log(error);
    }
}

async function getPostInfo(postID) {
    const postSnap = await getDoc(doc(db, "post", postID));
    if (postSnap.exists()) {
        console.log("Document data:", postSnap.data());
        return postSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
}

async function getUserInfo(username) {
    const userRef = doc(collection(db, "ACL", username));
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        console.log("Document data:", userSnap.data());
        return userSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
}

async function getPostAmount() {
    const postSnap = await getDocs(collection(db, "post"));
    
    var posts = [];
    postSnap.forEach(doc => {
        posts.push(doc.id);
    })
    return posts;
}

async function getUserAmount() {
    const amount = await getDocs(collection(db, "ACL"));

    var users = [];
    amount.forEach((doc) => {
        users.push(doc.metadata);
    });
    return users;
}

export { register, uploadIMG, newPost, deletePost, commentReply, getPostInfo, getUserInfo, getPostAmount, getUserAmount };