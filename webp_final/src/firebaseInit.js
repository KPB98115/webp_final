import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyD8FMwdJF58Nj0GHbBN4oAEjC-ztp-td1I",
    authDomain: "webp-final-5e5d5.firebaseapp.com",
    projectId: "webp-final-5e5d5",
    databaseURL: "gs://webp-final-5e5d5.appspot.com",
    storageBucket: "webp-final-5e5d5.appspot.com",
    messagingSenderId: "868651144863",
    appId: "1:868651144863:web:7999f70774f598efe4f4aa"
  };

const app = initializeApp(firebaseConfig);

export { app };
//export default !firebase.app.length ? initializeApp(firebaseConfig) : firebase.app();