import { useState, useEffect } from "react";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { Button } from "bootstrap";

function LoginForm() {

    async function googleAuth() {
        const provider = new GoogleAuthProvider();

        try {
            const auth = getAuth();
            
            await signInWithRedirect(auth, provider);
            auth.onAuthStateChanged(user => {
                if(user) {
                    //signed in
                    document.getElementById("logout_btn").hidden = false;
                } else {
                    //not signed in
                }
            });
        }catch(err) {

        }
    };
    
    return (
        <Button variant="outline-Light" onClick={googleAuth}>Log-in</Button>
    );
}

export default LoginForm;