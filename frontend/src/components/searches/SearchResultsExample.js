import React, { Component } from 'react';
import NavigationBar from '../layout/NavigationBar';
import UserPost2 from '../posts/UserPost';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import axios from 'axios'

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

    componentDidUpdate(prevProps) {
        if (this.props.match.params.terms !== prevProps.match.params.terms) {
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
                    {this.state.userPosts.length > 0 ? this.state.userPosts : <h1>No results!</h1>}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(SearchResultsExample)