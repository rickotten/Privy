import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class LandingPage extends Component {

    render() {
        return (
            <div className="landingPage">
                <h1 className="display-1 text-center">Welcome to</h1>
                <div className="thumbnail parent">
                    <img className="key" src="..\static\images\key.png" alt="yellow key" width="50%" height="500%"></img>
                    <div className="caption"><h1 className="bigText"> P R I V Y</h1></div>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success btn-lg">Sign me up!</button>
                </div>
                <br/>
                <div class="d-flex justify-content-center">
                    <Link className="linkColor">Already have an account?</Link>
                </div>
                <br/>
                <div className="card blackText">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3">
                                <img src="..\static\images\lock.png" alt="lock" width="90%" height="90%"></img>
                            </div>
                            <div className="col-sm-9">
                                <h1 className="display-3">We've got you on lock</h1>
                                <ul>
                                    <li><h2>Your data is in our secure database</h2></li>
                                    <li><h2>Don't feel fressured to used your real name</h2></li>
                                    <li><h2>You can use Google or Facebook login</h2></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="card blackText">

                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                <h1 className="display-3">Privacy is our #1 concern</h1>
                                <ul>
                                    <li><h2>We will never sell your data</h2></li>
                                    <li><h2>Cusotmize your privacy settings</h2></li>
                                    <li><h2>Our ads never collect your information</h2></li>
                                </ul>
                            </div>
                            <div className="col-sm-3">
                                <img src="..\static\images\incognito.png" alt="incognito" width="90%" height="90%"></img>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="card blackText">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3">
                                <img src="..\static\images\free.png" alt="free" width="90%" height="90%"></img>
                            </div>
                            <div className="col-sm-9">
                                <h1 className="display-3">Get started, it's free</h1>
                                <ul>
                                    <li><h2>Connect with your friends</h2></li>
                                    <li><h2>Share your pictures</h2></li>
                                    <li><h2>Take a poll of your connections</h2></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        )
    }
}

export default LandingPage;
