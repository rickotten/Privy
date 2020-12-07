import React, { Component } from 'react';
import NavigationBar from '../layout/NavigationBar';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import axios from 'axios'

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
                    localPages.push(<Grid key={post.id} item><a href={`#/pages/${post.id}`}><h1>Title: {post.title}</h1></a></Grid>);
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
                <Grid container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {loadingResults && <h1>Loading Search Results</h1>}
                    {(resultingPages.length === 0 && !loadingResults) ? <h1>No results!</h1> : resultingPages}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(SearchPages)