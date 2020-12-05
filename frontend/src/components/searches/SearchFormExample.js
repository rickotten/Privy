import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import { get_search_posts_data } from '../../actions/posts';
import { DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { Col, Row } from "react-bootstrap";

export class SearchFormExample extends Component {
    state = {
        search_text: '',
        selection: 'Users'
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });
    onSelect = e => this.setState({ [e.target.name]: e.target.value });



    //What is rendered for the user

    render() {
        const search_text = this.state;
        var url = "";
        switch (this.state.selection) {
            case 'Users':
                url = "/#/searchusers/" + this.state.search_text;
                break;

            case 'Posts':
                url = "/#/searchposts/" + this.state.search_text;
                break;

            case 'Pages':
                url = "/#/searchpages/" + this.state.search_text;
                break;

            default:
                break;
        }
        return (
            <div className="form-group">
                    <form onSubmit={this.onSubmit}>
                        {/* The text for the user's post */}
                            <Row>
                                <Col>
                                    <DropdownButton 
                                        title="Search..."
                                    >
                                            <DropdownItem name="selection" onSelect={this.onSelect} value="Users">Users</DropdownItem>
                                            <DropdownItem name="selection" onSelect={this.onSelect} value="Posts">Posts</DropdownItem>
                                            <DropdownItem name="selection" onSelect={this.onSelect} value="Pages">Pages</DropdownItem>
                                    </DropdownButton>
                                </Col>
                                <Col>
                                    <Form.Control className = "textField" type="text" placeholder="Search..."
                                        type="text"
                                        name="search_text"
                                        onChange={this.onChange}/>
                                </Col>
                                <Col>
                                    <a href= {url.toString()}>
                                        <button type="button" className="btn btn-info btn-sm text-light">Search!</button>
                                
                                    </a>
                                </Col>
                            </Row>
                    </form>
                </div>
        )
    }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps)(SearchFormExample)
