import React, { Component } from 'react';
import NavigationBar from '../layout/NavigationBar';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import axios from 'axios'

export class SearchPages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resultingPages: []
        }
    }


    componentDidMount() {
        this.lookUpPages()
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.terms !== prevProps.match.params.terms) {
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
                this.setState({resultingPages: localPages});

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
                    {this.state.resultingPages.length > 0 ? this.state.resultingPages : <h1>No results!</h1>}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(SearchPages)