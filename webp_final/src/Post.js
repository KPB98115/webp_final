import React from "react";
import { Button, } from "react-bootstrap";
import Logo from "./image/Logo.js";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = { status: false, amount: 0, image: <img src={Logo.emptyLike} alt="like logo" height="50px" width="50px"/>};
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
        e.currentTarget.blur();
    }

    render() {
        return (
            <div class="gallery-post">
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
                        <input id="post-comment-text" placeholder="leave you comment."/>
                        <Button id="post-comment-btn" variant="outline-secondary" size="sm">Submit</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;