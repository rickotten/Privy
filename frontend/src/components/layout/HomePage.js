import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import UserPost2 from "../posts/UserPost";
import UserPostForm from '../posts/UserPostForm';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';

export class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'Loading...',
            userPosts: <CircularProgress />
        }
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    componentDidMount() {
        // Hackey method to set the dark_mode theme.
        localStorage.setItem('DARK_THEME', this.props.auth.user.settings.dark_mode);
        this.lookUpPosts();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.username !== prevProps.match.params.username) {
            this.lookUpPosts();
            
        }
    }
    

        //axios.get('/api/auth/${username}') the two pages are going to have to have some kind of axios calls to get the user's posts

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
            createdAt: "2020-01-31T12:59-0500"
        };

            
        //Getting the user posts
        axios.get(`/api/auth/home/${this.props.auth.user.username}`, config)
            .then(res => {
                    const localPosts = [];
                    res.data.forEach(post => {
                        localPosts.push(<Grid key={post.id} item><UserPost2 key={post.id} tempContent={tempContent} post={post}/></Grid>);
                    })
                    this.setState({userPosts: localPosts});

            }).catch(err => {
                console.log(err);
            });
    }
        
    render() {

        return (
            <div>
                <NavigationBar />
                    <div className="card card-body">
                        <UserPostForm/>
                    </div>
                <Grid container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={3}
                >
                    {this.state.userPosts}
                </Grid>
                {/* <Jumbotron>
                    {this.userPosts}
                </Jumbotron> */}

                {/* <User /> */}
                {/* <CommentForm username={this.props.user["username"]}/> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(HomePage)
