import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import { get_search_posts_data } from '../../actions/posts';
import { DropdownButton, NavDropdown } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Nav from 'react-bootstrap/Nav'

export class SearchFormExample extends Component {
    state = {
        dropdownTitle: 'Filter by...',
        search_text: '',
        selection: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    };
    onSelect = e => {
        this.setState({ [e.target.name]: e.target.value, dropdownTitle: e.target.value });

    }


    search = e => {
        e.preventDefault()
        if (this.state.search_text) {
            switch (this.state.selection) {
                case 'Users':
                    window.location.href = "/#/searchusers/" + this.state.search_text;
                    break;

                case 'Posts':
                    window.location.href = "/#/searchposts/" + this.state.search_text;
                    break;

                case 'Pages':
                    window.location.href = "/#/searchpages/" + this.state.search_text;
                    break;

                default:
                    break;
            }
        }
    }

    //What is rendered for the user

    render() {
        return (
            <Nav>
                <Form onSubmit={this.search} inline>
                    {/* The text for the user's post */}
                    <Form.Control className="textField" type="text" placeholder="Search..."
                        name="search_text"
                        type="text"
                        onChange={this.onChange} />
                </Form>
                <NavDropdown title={this.state.dropdownTitle}>
                    <NavDropdown.Item
                        as="button"
                        name="selection"
                        value="Users"
                        onClick={this.onSelect}
                    >
                        Users
                    </NavDropdown.Item>
                    <NavDropdown.Item
                        as="button"
                        name="selection"
                        value="Posts"
                        onClick={this.onSelect}
                    >
                        Posts
                    </NavDropdown.Item>
                    <NavDropdown.Item
                        as="button"
                        name="selection"
                        value="Pages"
                        onClick={this.onSelect}
                    >
                        Pages
                    </NavDropdown.Item>
                </NavDropdown>
                {/* <DropdownButton title={this.state.dropdownTitle}>
                    <DropdownItem as="button" name="selection" onClick={this.onSelect} value="Users">Users</DropdownItem>
                    <DropdownItem as="button" name="selection" onClick={this.onSelect} value="Posts">Posts</DropdownItem>
                    <DropdownItem as="button" name="selection" onClick={this.onSelect} value="Pages">Pages</DropdownItem>
                </DropdownButton> */}
            </Nav>
            
        )
    }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps)(SearchFormExample)
