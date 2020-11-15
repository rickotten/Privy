import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form'
import { get_search_posts_data } from '../../actions/posts';
import NavigationBar from '../layout/NavigationBar';

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
                <NavigationBar/>
                    <h2 className="text-center">Search</h2>
                    <form onSubmit={this.onSubmit}>
                        {/* The text for the user's post */}

                                <Form.Group>
                                    
                                    <Form.Control type="text" placeholder="What do you want to search posts for?"
                                        type="text"
                                        name="search_text"
                                        onChange={this.onChange}/>

                                </Form.Group>

                                <a href= {url.toString()}>
                                <button type="button" className="btn btn-info btn-sm text-light">Search!</button></a>
                    </form>
                </div>
        )
    }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps)(SearchFormExample)
