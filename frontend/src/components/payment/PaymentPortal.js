import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import NavigationBar from '../layout/NavigationBar';


export class PaymentPortal extends Component {

    state = {
        bid: 0,
        item: undefined
    }

    static propTypes = {
        token: PropTypes.string.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.get_item()
    }

    componentDidUpdate(prevProps) {
        const item_id = this.props.match.params.item_id
        if (item_id !== prevProps.match.params.item_id) {
            this.get_item()
        }
    }

    make_bid = () => {
        const { bid } = this.state
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Token ${this.props.token}`
            }
        }
        const body = JSON.stringify({ bid })
        axios.post(`/itembid/${this.props.match.params.item_id}`, body, config)
            .then(res => {
                this.setState({ item: res.data })
            }).catch(err => {
                console.log(err)
            })
    }

    get_item() {
        axios.get('/getmarketitems')
            .then(res => {
                this.setState({ item: res.data[this.props.match.params.item_id] })
            }).catch(err => {
                console.log(err);
            })
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <br />
                <div className="container paymentPage">
                    <div className="text-center">
                        <h1 className="display-1">PAYMENT</h1>
                        <h3>Current Bid: {this.state.item ? this.state.item.current_bid : "Loading"}</h3>
                    </div>
                    <div>
                        <br />
                    </div>
                    <div className="d-flex justify-content-center">
                        <form>
                            <div className="form-group">
                                <input name="bid" onChange={this.onChange}  type="text" className="form-control text-center bigInput" id="inputPayment"
                                    placeholder="Dollar Amount" />
                            </div>
                        </form>
                    </div>
                    <div className="d-flex justify-content-center">
                        <form>
                            <button className="btn btn-success btn-lg" onClick={this.make_bid} >Send Money!</button>
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <button className="btn btn-danger btn-lg" formAction="#/">Back to Home!</button>
                        </form>
                    </div>
                    <div>
                        <br />
                    </div>
                    <div className="text-center">
                        <img src="..\static\images\dollar.jpg" alt="dollar" width="60%" height="60%"></img>
                    </div>
                    <div>
                        <br /><br />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(PaymentPortal);
