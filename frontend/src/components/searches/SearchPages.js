import React, { Component } from 'react';
import NavigationBar from '../layout/NavigationBar2';
import NavBlocker from '../../util/NavBlocker'
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import axios from 'axios'
import { Paper } from '@material-ui/core';
import Page from '../pages/Page'

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
                        <Page match={{ params: { postID: post.id } }} />
                    );
                })
                this.setState({ resultingPages: localPages, loadingResults: false });

            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        const { resultingPages, loadingResults } = this.state
        console.log(loadingResults)
        return (
            <div>
                <NavigationBar />
                <NavBlocker />
                {resultingPages}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(SearchPages)