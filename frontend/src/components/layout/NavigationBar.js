import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export class NavigationBar extends Component {

    render() {
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand>P R I V Y</Navbar.Brand>
                    <img src="../static/images/outhouse.png"/>
                    <Nav className="mr-auto">
                        <Nav.Link href="/#">Home</Nav.Link>
                        <Nav.Link href="#profile">Profile</Nav.Link>
                        <Nav.Link href="/#/addfriend">Add Friend</Nav.Link>
                        <Nav.Link href="#settings">Settings</Nav.Link>
                        <Nav.Link href="/#/logout">Logout</Nav.Link>
                        <Nav.Link href="/#/pages">Pages</Nav.Link>
                        <Nav.Link href="/#/createpage">Create a Page</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default NavigationBar;