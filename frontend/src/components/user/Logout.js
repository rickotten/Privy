import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { logout, friendRequest } from '../../actions/auth';
import NavigationBar from '../layout/NavigationBar';
import { Grid, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    root: {
        minHeight: 1000,
    }
});



export class Logout extends Component {


    static propTypes = {
        logout: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired
    }


    render() {
        const { isAuthenticated, user } = this.props.auth
        const classes = makeStyles();
        return (
            <div className={classes.root}>
                <NavigationBar />
                <div className="card card-body">
                    <div className="text-center m-auto">
                        <h2>Are you sure you want to leave, {user['username']}?</h2>
                        <img src="..\static\images\leaving_icon.png" alt="leaving" width="40%" height="40%"></img>
                        <br />
                        <button style={{ fontSize: 15, height: 50, width: 150 }} onClick={this.props.logout} className="btn btn-danger" aria-setsize="6">Yes, Logout</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Logout)
