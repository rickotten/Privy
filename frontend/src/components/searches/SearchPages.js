import React, { Component } from 'react';
import NavigationBar from '../layout/NavigationBar';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import axios from 'axios'
import { User } from '../user/User';

export class SearchUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'Loading...',
        }
    }


    componentDidMount() {
        this.lookUpUsers()
    }
    
    lookUpUsers = () => {
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

            
        //Getting the user
        axios.get(`searchusers/?search=${this.props.match.params.terms}`, config)
            .then(res => {
                    const localUsers = []
                    res.data.forEach(post => {
                        localUsers.push(<Grid key={post.id} item><UserPost2 post={post} /></Grid>);
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
                    {this.state.pages}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(SearchUsers)