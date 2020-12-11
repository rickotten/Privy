import React, { Component } from 'react';
import NavigationBar from '../layout/NavigationBar2';
import NavBlocker from '../../util/NavBlocker'
import UserPost2 from '../posts/UserPost';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import axios from 'axios'
import Footer from '../layout/Footer'

const useStyles = (theme) => ({
    text: {
        fontFamily: 'Nunito',
        fontWeight: 'bold',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center'
    },
})
export class SearchResultsExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'Loading...',
            userPosts: [],
            loadingResults: true
        }
    }


    componentDidMount() {
        this.lookUpPosts()
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.terms !== prevProps.match.params.terms) {
            this.setState({ userPosts: [], loadingResults: true })
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
                    localPosts.push(<UserPost2 post={post} />);
                })
                this.setState({ userPosts: localPosts, loadingResults: false });

            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        const classes = this.props.classes
        const { userPosts, loadingResults } = this.state
        return (
            <div>
                <NavigationBar authenticated />
                <NavBlocker />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h3 className={classes.text}>{loadingResults ? 'Loading Results...' : 'Search Results'}</h3>
                    </Grid>
                    {userPosts.length === 0 && <Grid item xs={12}><h3 className={classes.text}>No results!</h3></Grid>}
                    {userPosts.map(each => <Grid item xs={6}>{each}</Grid>)}
                </Grid>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withStyles(useStyles)(SearchResultsExample))