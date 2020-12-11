import axios from 'axios'
import { Grid, Paper, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import React, { Component } from 'react';
import NavigationBar from "../layout/NavigationBar2";
import CreatePageForm from "./CreatePageForm";
import PropTypes from 'prop-types'
import Page from './Page'
import Footer from "../layout/Footer";
import { withStyles } from "@material-ui/core";
import NavBlocker from "../../util/NavBlocker";

const useStyles = (theme) => ({
    title: {
        color: '#fff',
        fontSize: '2rem',
        fontWeight: 'bold'
    },
    colorText: {
        color: '#5AFF3D',
        fontWeight: 'bold'
    },
})
export class MyPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: <CircularProgress />
        }
    }

    static propTypes = {
        auth: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.getUserPages()
    }

    getUserPages = () => {
        // Code below taken from auth.js action
        const token = this.props.auth.token;
        const classes = this.props.classes
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

        axios.get('/userpages', config)
            .then(res => {
                const localPages = []
                res.data.forEach(page => {
                    localPages.push(
                        <Page noFooter match={{ params: { pageID: page.id } }} />
                    )
                })
                if (localPages.length === 0) {
                    this.setState({
                        pages: <h3 className={classes.title}>
                            You are not subscribed to any Privy<span className={classes.colorText}>Pages.</span> Start searching!</h3>})
                } else {
                    this.setState({ pages: localPages })
                }
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <NavigationBar authenticated/>
                <NavBlocker/>
                {this.state.pages}
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(withStyles(useStyles)(MyPages))