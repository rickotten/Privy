import React, { Component } from 'react';
import NavigationBar from '../layout/NavigationBar2';
import NavBlocker from '../../util/NavBlocker'
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import Page from '../pages/Page'

const useStyles = theme => ({
    text: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center'
    },
})
export class SearchPages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resultingPages: [],
            loadingResults: true
        }
    }


    componentDidMount() {
        this.lookUpPages()
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.terms !== prevProps.match.params.terms) {
            this.setState({ resultingPages: [], loadingResults: true })
            this.lookUpPages();
        }
    }

    lookUpPages = () => {
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
        axios.get(`searchpages/?search=${this.props.match.params.terms}`, config)
            .then(res => {
                const localPages = []
                res.data.forEach(post => {
                    localPages.push(
                        <Page match={{ params: { pageID: post.id } }} />
                    );
                })
                this.setState({ resultingPages: localPages, loadingResults: false });

            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        const classes = this.props.classes
        const { resultingPages, loadingResults } = this.state
        console.log(loadingResults)
        return (
            <div>
                <NavigationBar authenticated />
                <NavBlocker />
                <h2 className={classes.text}>{loadingResults ? 'Loading Results...' : 'Search Results'}</h2>
                {resultingPages}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withStyles(useStyles)(SearchPages))