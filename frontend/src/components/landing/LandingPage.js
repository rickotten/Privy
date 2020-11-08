import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export class LandingPage extends Component {

    render() {
        return (
            <div className="landingPage parent">
                <h1 className="display-1 text-center">Welcome to</h1>
                <div className="thumbnail">
                    <img className="key" src="..\static\images\key.png" alt="yellow key" width="50%" height="500%"></img>
                    <div className="caption"><h1 className="bigText"> P R I V Y</h1></div>
                </div>
                <div className="card blackText">
                    <h1 >We've got you on lock</h1>
                    <ul>
                        <li>Your data is in our secure database</li>
                        <li>Don't feel fressured to used your real name</li>
                        <li>You can use Google or Facebook login</li>
                    </ul>
                </div>
                <br />
                <div className="card blackText">
                    <h1>Privacy is our number 1 concern</h1>
                    <ul>
                        <li>We will never sell your data</li>
                        <li>Cusotmize your privacy settings</li>
                        <li>Our ads never colect your information</li>
                    </ul>
                </div>
                <br />
                <div className="card blackText">
                    <h1>Get started, it's free</h1>
                    <ul>
                        <li>Connect with your friends</li>
                        <li>Share your pictures</li>
                        <li>Take a poll</li>
                    </ul>
                </div>
                <br />
                <div class="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary">Sign me up!</button>
                </div>
                <div class="d-flex justify-content-center">
                    <Link>Already have an account?</Link>
                </div>
            </div>
        )
    }
}

export default LandingPage;
