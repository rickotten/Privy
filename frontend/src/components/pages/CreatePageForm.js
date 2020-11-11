import axios from 'axios';
import Form from 'react-bootstrap/Form'
import NavigationBar from '../layout/NavigationBar'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { create_page } from "../../actions/pages"
import Page from "./Page"

export class CreatePageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "An Interesting Title",
			description: "A compelling description"
		}
	}

	static propTypes = {
		auth: PropTypes.object.isRequired,
	}

	onSubmit = e => {
		e.preventDefault();
		this.create_page(this.state.title, this.state.description);
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	create_page = (title, description) => {
		// const config = tokenConfig(getState);

		// Headers 
		const config = {
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Token ${this.props.auth.token}`
			}
		}

		// If token, add to headers config
		// if (token) {
		// 	config.headers['Authorization'] = `Token ${token}`;
		// }

		const body = JSON.stringify({ title, description });
		axios.post('/pages', body, config)
			.then(res => {
				console.log('Here is the page:')
				console.log(res.data)
			}).catch(err => {
				console.log(err);
			})
	}

	render() {
		const { title, description } = this.state;
		return (
			<div>
				<div>
					<div className="card card-body mt-5">
						<h2 className="text-center">Create A New Page</h2>
						<form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label>Title</label>
								<input
									type="text"
									className="form-control"
									name="title"
									onChange={this.onChange}
									value={title}
								/>
							</div>
							<div className="form-group">
								<label>Description</label>
								<input
									type="text"
									className="form-control"
									name="description"
									onChange={this.onChange}
									value={description}
								/>
							</div>
							<div className="form-group">
								<form action="window.location.href='/pages/:${this.props.match.params.pageID}'">
									<button type="submit" className="btn btn-primary">
										Create
									</button>
								</form>
							</div>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
	
})

export default connect(mapStateToProps)(CreatePageForm)
