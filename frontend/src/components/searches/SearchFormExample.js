import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import { get_search_posts_data } from '../../actions/posts';

export class SearchFormExample extends Component {
    state = {
        search_text: '',
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    //What is rendered for the user
    render() {
        const search_text = this.state;
        const url = "/#/searchposts/" + this.state.search_text;
        return (
            <div className="form-group">

                    <form onSubmit={this.onSubmit}>
                        {/* The text for the user's post */}

                                <Form.Group>
                                    <Form.Control className = "textField" type="text" placeholder="Search posts..."
                                        type="text"
                                        name="search_text"
                                        onChange={this.onChange}/>

                                        <a href= {url.toString()}>
                                        <button type="button" className="btn btn-info btn-sm text-light">Search!</button>
                                        </a>

                                </Form.Group>

                                
                    </form>
                </div>
        )
    }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps)(SearchFormExample)
