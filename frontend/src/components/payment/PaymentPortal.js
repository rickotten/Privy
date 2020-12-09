import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import NavigationBar from '../layout/NavigationBar';
import Typography from '@material-ui/core/Typography';


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
                this.setState({ item: res.data[this.props.match.params.item_id - 1] })
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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex' }}>
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
                                        <input name="bid" onChange={this.onChange} type="text" className="form-control text-center bigInput" id="inputPayment"
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

                            <div>
                                <br /><br />
                            </div>
                        </div>
                        <LayoutTextFields />
                    </div>
                    <div className="text-center" padding={20}>
                        <img src="..\static\images\dollar.jpg" alt="dollar" width="60%" height="60%"></img>
                    </div>
                </div>
            </div>
        )
    }
}

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));

function LayoutTextFields() {
    const classes = useStyles();

    return (
        <Paper elevation={3}>
            <div className={classes.root}>
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: 20 }}>
                    <div>
                        Thank you for using Privy to buy and sell items! As part of our policy, we do not sell your data nor do we employ the use of personalized ads. Our operational cost if funded through our crypto coin. We process your transaction by converting your dollar value into our digital currency PrivyCoins. As a seller, you may cash out your PrivyCoins, or hold on to them as an investment.
                    </div>
                    <img src="..\static\images\cryptocurrency-coin-2422.png" alt="dollar"></img>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                    <TextField
                        id="standard-full-width"
                        label="Card Number"
                        style={{ width: '45%' }}
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        helperText="Your personal details are not shared with anyone"
                        fullWidth
                        // margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Last Name"
                        style={{ width: '45%' }}
                        fullWidth
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
                        <TextField
                            label="Expireation Date"
                            defaultValue=""
                            helperText="eg. 08/2020"
                            fullWidth
                        // margin="dense"
                        />
                        <TextField
                            label="CW"
                            defaultValue=""
                            helperText="eg. 123"
                            fullWidth
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '45%' }}>
                        <TextField
                            id="standard-full-width"
                            label="First Name"
                            style={{ width: '100%' }}
                            fullWidth
                        />
                    </div>
                </div>
            </div>
        </Paper >
    );
}

const mapStateToProps = state => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(PaymentPortal);
