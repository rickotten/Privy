import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

export class NavigationBar extends Component {

    render() {
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand>P R I V Y</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/#">Home</Nav.Link>
                        <Nav.Link href="/#/addfriend">Add Friend</Nav.Link>
                        <Nav.Link href="/#/createpost">Create Post</Nav.Link>
                        <Nav.Link href="/#/logout">Logout</Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

export default NavigationBar;