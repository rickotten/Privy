import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'


export class PaymentPortal extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
    }

    render() {
        if (this.props.isAuthenticated) {
            /* 
            Update state before the HomePage component loads. That way, it is guranateed this action will 
            fire and reduce to update the state before the state is loaded immutably into the HomePage 
            component.
            */
            return <Redirect to="/" />;
        }
        return (
            <div className="container paymentPage">
                <div className="text-center">
                    <h1 className="display-1">PAYMENT</h1>
                </div>
                <div className="text-center">
                    <img src="..\static\images\dollar.jpg" alt="dollar" width="90%" height="90%"></img>
                </div>
                <div>
                    <br/><br/><br/>
                </div>
                <div className="d-flex justify-content-center">
                    <form>
                    <div class="form-group form-group-lg">
                            <input type="text" className="form-control input-lg text-center" id="inputPayment" placeholder="Dollar Amount" />
                            </div>
                    </form>
                </div>
                <div>
                    <br/><br/><br/>
                </div>
                <div className="d-flex justify-content-center">
                    <form>
                        <button className="btn btn-success btn-lg" formaction="#/register">Send Money!</button>
                    </form>
                </div>
                <div>
                    <br/><br/><br/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(PaymentPortal);
