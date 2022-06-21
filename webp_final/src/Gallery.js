import { useState } from "react";
import Post from "./Post.js";

function Gallery(props) {
    var posts = [];
    
    for (var postID in props.gallery) {
        posts.push(<Post postid={postID} seq={postID.indexOf(postID)}/>);
    }

    if (posts.length) {
        return posts.map((element, index) => {
            return (
                <div key={index}>
                    {element}
                </div>
            );
        });
    }
    else {
        return <div id="no_post_exception">No post in the gallery.</div>;
    }

}

export default Gallery;