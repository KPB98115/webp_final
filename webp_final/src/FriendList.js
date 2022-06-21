import { useState } from "react";
import * as firebase from "./firebase";

function FriendList() {
    const users_meta = firebase.getUserAmount();
    var users = [];

    for (var data in users_meta) {
        users.push(<UserInfo username={data}/>);
    }

    if (users.length) {
        return users.map((user, index) => {
            return (
                <div key={index}>
                    {user}
                </div>
            );
        });
    }
    else return(<p>Poor boy you have no friend.</p>);

}

function UserInfo(props) {
    const [status, setStatus] = useState(false);
    const [list, setList] = useState(props.username);

    if (!list) {
        setList("undefine user");
    }

    return(
        <div className="fd_list_userInfo">
            <div className="fd_list_username">{list}</div>
            <div className="fd_list_status">{status ? <p>friend of you!</p> : <p>No your friend</p>}</div>
        </div>
    );
}

export default FriendList;