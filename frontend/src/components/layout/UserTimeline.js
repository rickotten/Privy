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

    constructor(props) {
        super(props);
        this.state = {
            username: 'Loading...',
            userPosts: []
        }
    }


    componentDidMount() {
        this.lookUpPosts();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.username !== prevProps.match.params.username) {
            this.lookUpPosts();
            
        }
    }

    lookUpPosts = () => {
        // Code below taken from auth.js action
        const token = this.props.auth.token;
        // Headers 
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        // If token, add to headers config
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }

        const tempContent = {
            createdAt: "2020-01-31T12:59-0500",
            userImage: "/static/images/no-img.png",
            commentCount: 10
        };

            
        //Getting the user posts
        axios.get(`/api/auth/home/${this.props.match.params.username}`, config)
            .then(res => {
                    const localPosts = []
                    res.data.forEach(post => {
                        localPosts.push(<UserPost key={post.id} tempContent={tempContent} post={post}/>);
                    })
                    this.setState({userPosts: localPosts});

            }).catch(err => {
                console.log(err);
            });
    }
        
    render() {

        return (
            <div>
                <NavigationBar/>
                <Jumbotron>
                    {this.state.userPosts}
                </Jumbotron>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(UserTimeline)
