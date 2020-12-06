import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import NavigationBar from "../layout/NavigationBar"


export class Marketplace extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <br />
                <div className="container marketPage">
                    <div className="text-center">
                        <h1 className="display-1">Marketplace</h1>
                    </div>
                    <div className="row m-auto text-center">
                        <div className="col-md-4">
                            <h1 className="customHeading">Sweater</h1>
                            <img src="..\static\images\sweater.jpg" alt="sweater" width="90%" height="70%"></img>
                            <form>
                                <br/>
                                <button className="btn btn-success btn-lg" formAction="#/payment">bid now!</button>
                            </form>
                        </div>
                        <div className="col-md-4">
                        <h1 className="customHeading">Beachball</h1>
                            <img src="..\static\images\beachball.jpg" alt="sweater" width="90%" height="70%"></img>
                            <form>
                                <br/>
                                <button className="btn btn-success btn-lg" formAction="#/payment">bid now!</button>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <h1 className="customHeading">Lawnmower</h1>
                            <img src="..\static\images\lawnmower.jpg" alt="sweater" width="90%" height="70%"></img>
                            <form>
                                <br/>
                                <button className="btn btn-success btn-lg"  formAction="#/payment">bid now!</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Marketplace);
