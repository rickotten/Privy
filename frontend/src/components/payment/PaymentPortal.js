import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import NavigationBar from '../layout/NavigationBar';


export class PaymentPortal extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <br />
                <div className="container paymentPage">
                    <div className="text-center">
                        <h1 className="display-1">PAYMENT</h1>
                    </div>
                    <div>
                        <br />
                    </div>
                    <div className="d-flex justify-content-center">
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control text-center bigInput" id="inputPayment"
                                    placeholder="Dollar Amount" />
                            </div>
                        </form>
                    </div>
                    <div className="d-flex justify-content-center">
                        <form>
                            <button className="btn btn-success btn-lg">Send Money!</button>
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
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(PaymentPortal);
