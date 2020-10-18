import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import UserPost from '../posts/UserPost';
import { Jumbotron } from "react-bootstrap";
// import Scream from '../posts/Scream';

export class HomePage extends Component {
    state = {
        description: "test description" ,
        text_body: "here is a text body"
    }

    userPosts = [];
    
    populatePosts = () => {
        const post = {
            body: "hello there",
            createdAt: "2000-01-31T12:59-0500",
            userImage: "/static/images/no-img.png",
            userHandle: 'alphanum',
            postId: 1,
            likeCount: 5,
            commentCount: 10
        };
        this.userPosts.push(<UserPost key={post.postId} post={post}/>);
        this.userPosts.push(<UserPost key={post.postId + 1} post={post} />);
    }

    render() {
       this.populatePosts();
        return (
            <div>
                <NavigationBar/>
                <Jumbotron>
                    {this.userPosts}
                </Jumbotron>
            </div>
        )
    }
}

export default HomePage
