import axios from 'axios'
import { Grid, Paper, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import React, { Component } from 'react';
import NavigationBar from "../layout/NavigationBar";
import CreatePageForm from "./CreatePageForm";
import PropTypes from 'prop-types'


export class MyPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: <CircularProgress/>
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
                    <a key={page.id} href={`#/pages/${page.id}`}><h2>{page.title}</h2></a>
                    )
                })
                if (localPages.length === 0) {
                    this.setState({ pages: <h2>You're not subscribed to any pages!</h2>})
                } else {
                    this.setState({ pages: localPages})
                }
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        return(
            <div>
                <NavigationBar/>
                <CreatePageForm/>
                <div className="card card-body mt-5">
                    <h1 className="text-center">My Pages</h1>
                    <Grid>
                        <Grid>
                            <Paper>
                                {this.state.pages}
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(MyPages)