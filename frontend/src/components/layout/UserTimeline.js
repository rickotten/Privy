import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import UserPost from '../posts/UserPost';
import { Jumbotron } from "react-bootstrap";
import User from '../user/User';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import UserPostForm from '../posts/UserPostForm';
import axios from 'axios'
import get_user_data from '../../actions/posts';

export class UserTimeline extends Component {
    static propTypes = {
        get_user_data: PropTypes.func.isRequired,
        data: PropTypes.object.isRequired
    }

    state = {
        userPosts: null
    }
    

        //axios.get('/api/auth/${username}') the two pages are going to have to have some kind of axios calls to get the user's posts


    render() {
        this.populatePosts();
        return (
            <div>
                <NavigationBar/>
                <Jumbotron>
                    {this.userPosts}
                    //here we need to make a timeline of friends rather than simple posts
                </Jumbotron>
                <User/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
})

/*
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

        const handle = this.props.match.params.handle;
        
        const { _, userPosts } = this.props.get_user_data(handle);
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
                    //here we need to make a timeline of friends rather than simple posts
                </Jumbotron>
                <User/>
                <UserPostForm/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
})*/

export default connect(mapStateToProps)(UserTimeline)
