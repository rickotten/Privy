import React, { Component } from 'react';
import NavigationBar from '../layout/NavigationBar';
import UserPost2 from '../posts/UserPost';
import Grid from '@material-ui/core/Grid';
import { Jumbotron } from "react-bootstrap";
import User from '../user/User';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import UserPostForm from '../posts/UserPostForm';
import axios from 'axios'
import get_user_data from '../../actions/posts';

export class SearchResultsExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'Loading...',
            userPosts: []
        }
    }


    componentDidMount() {
        this.lookUpPosts()
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

            
        //Getting the user posts
        axios.get(`searchposts/?search=${this.props.match.params.terms}`, config)
            .then(res => {
                    const localPosts = []
                    res.data.forEach(post => {
                        localPosts.push(<Grid key={post.id} item><UserPost2 post={post} /></Grid>);
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
                <Grid container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {this.state.userPosts}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(SearchResultsExample)