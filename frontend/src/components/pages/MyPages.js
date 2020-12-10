import axios from 'axios'
import { Grid, Paper, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import React, { Component } from 'react';
import NavigationBar from "../layout/NavigationBar2";
import CreatePageForm from "./CreatePageForm";
import PropTypes from 'prop-types'
import Page from './Page'
import Footer from "../layout/Footer";

export class MyPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: <CircularProgress />
        }
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.getUserPages()
    }

    getUserPages = () => {
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

        axios.get('/userpages', config)
            .then(res => {
                const localPages = []
                res.data.forEach(page => {
                    localPages.push(
                        <Page noFooter match={{ params: { pageID: page.id } }} />
                    )
                })
                if (localPages.length === 0) {
                    this.setState({ pages: <h2>You're not subscribed to any pages!</h2> })
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
                <NavigationBar />
                {this.state.pages}
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(MyPages)