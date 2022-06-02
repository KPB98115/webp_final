import { useState, useEffect } from "react";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPW] = useState("");
    const [login_btn, setBtn] = useState(document.getElementById("btn"));

    const login = () => {
        setUsername("abc");
        
    }
    useEffect(() => {
        
    }, [username])
    
    return <h1>user</h1>
}

export {LoginForm};