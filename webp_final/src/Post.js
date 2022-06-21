import React from "react";
import {useState, useEffect} from "react";
import { Button, } from "react-bootstrap";
import Logo from "./image/Logo.js";
import * as firebase from "./firebase.js";

/**
 * fetch data from API and assign to a globle variable
 * const post_info = fetch(url, () => {}).done().fail().always();
 * post_info => { "1":{ "username":"peter", "comment":"text", "timestamp","00:00:00 dd/mm/yyyy" }, "2":{}, "3":{}, ...}
 */

function CommentSection(props) {
    //目前改變 author & comment的狀態只是示範用，之後會改成 upload使用者名稱及留言到 Back End
    const [author, setAuthor] = useState(props.author);
    const [comment, setComment] = useState(props.comment);
    const [timestamp, setTimestamp] = useState(new Date());

    //從這裡 upload使用者名稱及留言到 Back End
    const submitComment = (e) => {
        var userInput = e.currentTarget.parentElement.querySelector("input").value;

        if (userInput !== "") {
            e.currentTarget.blur();
            return setComment(userInput);
        }
        else console.log("Can not reply empty string comment.");
        
        e.currentTarget.blur();
        
        return;
    };
    /**這個 function用來展示從 DB中存取的使用者名稱及留言紀錄
    const showComment = () => {
        post_info[index].foreach(element => {
            
        })
    }
    */

    return (
        <div className="post-comment-section">
            <div className="comments">
                {/* 這裡會 replace by showComment() or <Comments />*/}
                <p className="comments-author">{author} : </p>
                <p className="comments-text">{comment}</p>
                <p className="comments-timestamp">{"- "+timestamp.toLocaleTimeString()}</p>
            </div>
            <input id="post-comment-text" placeholder="leave you comment."/>
            <Button id="post-comment-btn" variant="outline-secondary" size="sm" onClick={submitComment}>Submit</Button>
        </div>
    );
}

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            postID: props.postid,
            sequence: props.seq,
            user: "root", 
            status: false, 
            amount: 0, 
            image: <img src={Logo.emptyLike} alt="like logo" height="50px" width="50px"/> //src should be a url
        };
        this.clickLike = this.clickLike.bind(this);
    }

    clickLike(e) {
        if (this.state.status === false) {
            this.setState({
                status: true, 
                amount: this.state.amount + 1, 
                image: <img src={Logo.bigLike} alt="like logo" height="50px" width="50px"/>
            });
        }
        else {
            this.setState({
                status: false, 
                amount: this.state.amount - 1, 
                image: <img src={Logo.emptyLike} alt="like logo" height="50px" width="50px"/>
            });
        }
        console.log(this.props.postID, this.props.seq);
        e.currentTarget.blur();
    }

    /**
    componentDidMount() {
        this.timerID = setInterval(
            () => this.updatePostProps(),
            100000
        );
    }
     */

    updatePostProps() {
        //const snapshot =  firebase.getPostInfo(this.state.postID); //return post snapshot data
        
    }

    render() {
        return (
            <div className="gallery-post">
                <div id="post-username">{this.state.user}</div>
                <div id="post-image"><img src={Logo.cgu} alt="cgu logo"/></div>
                <div id="post-props">
                    <div id="post-score">
                        <div id="post-score-like">
                            <Button onClick={this.clickLike} variant="outline-Light" size="sm">
                                { this.state.image }
                            </Button>
                        </div>
                        <div id="post-score-amount">
                            <h3>{this.state.amount}</h3>
                        </div>
                    </div>
                    <div id="post-comment">
                        <CommentSection author={""} comment={""} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;