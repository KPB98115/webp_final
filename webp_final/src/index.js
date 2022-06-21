import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Frontpage';
import Netvigator from "./Netvigator";
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { app } from './firebaseInit';
import { getAuth, onAuthStateChanged } from "firebase/auth";


// Initialize Firebase
const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));

try {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      root.render(
        <React.StrictMode>
            <Netvigator auth={true} user={user}/>
            <Main />
        </React.StrictMode>
      )
    } else {
      //console.log("cant login.");
      root.render(
        <React.StrictMode>
          <Netvigator auth={false} user={false}/>
          
        </React.StrictMode>
      )
    }
  })


} catch (error) {
  console.log(error);
}

document.getElementsByTagName("root").render()



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();