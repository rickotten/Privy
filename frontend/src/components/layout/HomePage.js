import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import UserPost from '../posts/UserPost';
import { Jumbotron } from "react-bootstrap";
import User from '../user/User';
import { connect } from "react-redux";
import PropTypes from 'prop-types'

export class HomePage extends Component {
    static propTypes = {
        posts: PropTypes.object.isRequired
    }

    userPosts = [];
    
    populatePosts = () => {
        if (this.props.posts.postsLoading) {
            return;
        }
        this.userPosts = [];
        const tempContent = {
            createdAt: "2020-01-31T12:59-0500",
            userImage: "/static/images/no-img.png",
            commentCount: 10
        };
        const { _, userPosts } = this.props.posts;
        if (userPosts) {
            userPosts.forEach(post => {
                this.userPosts.push(<UserPost key={post.id} tempContent={tempContent} post={post}/>);
            });
        }
    }

    render() {
        this.populatePosts();
        return (
            <div>
                <NavigationBar/>
                <Jumbotron>
                    {this.userPosts}
                </Jumbotron>
                <User/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
})

export default connect(mapStateToProps)(HomePage)
