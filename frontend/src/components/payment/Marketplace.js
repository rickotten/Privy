import axios from 'axios';
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
    state = {
        items: []
    }

    componentDidMount() {
        axios.get('/getmarketitems')
            .then(res => {
                this.setState({ items: res.data })
            }).catch(err => {
                console.log(err);
            })
    }

    render() {
        const { items } = this.state
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
                            <h1 className="customHeading">Sweater Bid: {items.length > 0 ? items[0].current_bid : "Loading"}</h1>
                            <img src="..\static\images\sweater.jpg" alt="sweater" width="90%" height="70%"></img>
                            <form>
                                <br/>
                                <button className="btn btn-success btn-lg" formAction={`#/payment/${0}`}>bid now!</button>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <h1 className="customHeading">Beachball Bid: {items.length > 0 ? items[1].current_bid : "Loading"}</h1>
                            <img src="..\static\images\beachball.jpg" alt="sweater" width="90%" height="70%"></img>
                            <form>
                                <br/>
                                <button className="btn btn-success btn-lg" formAction={`#/payment/${1}`}>bid now!</button>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <h1 className="customHeading">Lawnmower Bid: {items.length > 0 ? items[2].current_bid : "Loading"}</h1>
                            <img src="..\static\images\lawnmower.jpg" alt="sweater" width="90%" height="70%"></img>
                            <form>
                                <br/>
                                <button className="btn btn-success btn-lg" formAction={`#/payment/${2}`}>bid now!</button>
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
