import React, { Component } from 'react';
import NavigationBar from '../layout/NavigationBar';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import axios from 'axios'
import { Paper } from '@material-ui/core';

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
                            <a href={`#/pages/${post.id}`}>
                                <Paper style={{width: 600, height: 100, padding: 15, marginTop: 15}} rounded={true}>
                                    <h1>Title: {post.title}</h1>
                                </Paper>
                            </a>
                        );
                })
                this.setState({resultingPages: localPages, loadingResults: false});

            }).catch(err => {
                console.log(err);
            });
    }
        
    render() {
        const { resultingPages, loadingResults } = this.state
        console.log(loadingResults)
        return (
            <div>
                <NavigationBar/>
                <div className="card card-body">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {loadingResults && <h1>Loading Search Results</h1>}
                        {(resultingPages.length === 0 && !loadingResults) ? <h1>No results!</h1> : resultingPages}
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

export default connect(mapStateToProps)(SearchPages)