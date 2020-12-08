import React, { Component } from 'react';
import NavigationBar from '../layout/NavigationBar';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import axios from 'axios'
import { User } from '../user/User';
import Avatar from '@material-ui/core/Avatar';
import { Paper } from '@material-ui/core';
import { sizing } from '@material-ui/system';


export class SearchUsers extends Component {
 

    constructor(props) {
        super(props);
        this.state = {
            resultingUsers: [],
            loadingResults: true
        }
    }



    componentDidMount() {
        this.lookUpUsers()
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.terms !== prevProps.match.params.terms) {
            this.setState({ resultingUsers: [], loadingResults: true })
            this.lookUpUsers();
        }
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
        axios.get(`searchuser/?search=${this.props.match.params.terms}`, config)
            .then(res => {
                const results = res.data
                const localResults = []
                results.forEach(user => {
                localResults.push(
                    <a href={`#/profile/${user.username}`}>
                        <Paper style={{width: 600, height: 100, padding: 15, marginTop: 15}} variant="outlined">
                            <div className="row centered">
                                <Avatar/>
                                <h1>Username: {user.username}</h1>
                            </div>
                        </Paper>
                    </a>);
                })
                this.setState({ resultingUsers: localResults, loadingResults: false });

            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        const { resultingUsers, loadingResults } = this.state;
        return (
            <div>
                <NavigationBar />
                <div className="card card-body">
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {loadingResults && <h1>Loading Search Results</h1>}
                        {(resultingUsers.length === 0 && !loadingResults) ? <h1>No results!</h1> : resultingUsers}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(SearchUsers)