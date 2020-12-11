import React, { Component } from 'react';
import NavigationBar from '../layout/NavigationBar2';
import { connect } from "react-redux";
import axios from 'axios'
import { Grid } from '@material-ui/core';
import NavBlocker from '../../util/NavBlocker'
import ArbitraryUserProfile2 from '../user/ArbitraryUserProfile2'
import { withStyles } from '@material-ui/core/styles'
import Footer from '../layout/Footer'

const useStyles = theme => ({
    textField: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center'
    },
})
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
                        <ArbitraryUserProfile2 noBar match={{ params: { username: user.username } }} />
                    );
                })
                this.setState({ resultingUsers: localResults, loadingResults: false });

            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        const classes = this.props.classes
        const { resultingUsers, loadingResults } = this.state;
        return (
            <div>
                <NavigationBar authenticated />
                <NavBlocker />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h3 className={classes.textField}>{loadingResults ? 'Loading Results...' : 'Search Results'}</h3>
                    </Grid>
                    {resultingUsers.length === 0 && <Grid item xs={12}><h3 className={classes.textField}>No results!</h3></Grid>}
                    {resultingUsers.map(each => <Grid item xs={12}>{each}</Grid>)}
                </Grid>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withStyles(useStyles)(SearchUsers))