import Form from 'react-bootstrap/Form'
import NavigationBar from '../layout/NavigationBar'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { create_page } from "../../actions/pages"

export class CreatePageForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "An Interesting Title",
			description: "A compelling description"
		}
	}

	static propTypes = {
		create_page: PropTypes.func.isRequired,
		auth: PropTypes.object.isRequired,
	}

	onSubmit = e => {
		e.preventDefault();
		this.props.create_page(this.state.title, this.state.description);
	}

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	render() {
		const { title, description } = this.state;
		return (
			<div>
			<NavigationBar />
				<div className="col-md-6 m-auto" >
					<div className="card card-body mt-5">
						<h2 className="text-center">Create Page</h2>
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
								<button type="submit" className="btn btn-primary">
									Create
                            </button>
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

export default connect(mapStateToProps, { create_page })(CreatePageForm)
