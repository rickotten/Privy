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
        const { isAuthenticated, user} = this.props.auth
        const classes = makeStyles();
        return (
            <div className = {classes.root}>
                <NavigationBar/> 
                <Grid>
                    <Paper>
                        <h2>See you next time, {user['username']}!</h2>
                        <button style= {{fontSize:15, height:50, width:150}} onClick={this.props.logout} className="btn btn-info btn-sm text-light" aria-setsize = "6">Logout</button>
                    </Paper>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout})(Logout)
