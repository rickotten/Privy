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
            resultingUsers: []
        }
    }


    componentDidMount() {
        this.lookUpUsers()
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.terms !== prevProps.match.params.terms) {
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
                localResults.push(<Grid key={user.id} item><a href={`#/profile/${user.username}`}><h1>Username: {user.username}</h1></a></Grid>);
                })
                this.setState({ resultingUsers: localResults });

            }).catch(err => {
                console.log(err);
            });
    }

    render() {

        return (
            <div>
                <NavigationBar />
                <Grid container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {this.state.resultingUsers.length > 0 ? this.state.resultingUsers : (<h1>No results!</h1>)}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(SearchUsers)