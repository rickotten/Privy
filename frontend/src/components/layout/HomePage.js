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
            userPosts: <CircularProgress />,
            reload: false
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
        if (this.props.match.params.username !== prevProps.match.params.username || this.state.reload) {
            this.lookUpPosts();
        }
    }

    reload = () => {
        this.setState({ reload: true })
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
            createdAt: "2020-01-31T12:59-0500"
        };

            
        //Getting the user posts
        axios.get(`/api/auth/home/${this.props.auth.user.username}`, config)
            .then(res => {
                    const localPosts = [];
                    res.data.forEach(post => {
                        localPosts.push(<UserPost2 reload={this.reload}
                            key={post.id} tempContent={tempContent} post={post}/>);
                    })
                    if (localPosts.length === 0) {
                        this.setState({userPosts: (<h1 style={{paddingTop: 10}}>No Posts yet!</h1>)})
                    }
                    else {
                        this.setState({userPosts: localPosts});
                    }

            }).catch(err => {
                console.log(err);
            });
            this.setState({ reload: false })
    }

    render() {
        return (
            <div>
                <NavigationBar />
                    <div className="card card-body">
                        <UserPostForm reload={this.reload}/>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
                            {this.state.userPosts}
                        </div>
                    </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(HomePage)
