import axios from 'axios';
import React, { Component } from 'react'
import UserPost2 from "./UserPost";
import NavigationBar from "../layout/NavigationBar2";
import { Grid } from "@material-ui/core";
import NavBlocker from "../../util/NavBlocker";

export class UserPostView extends Component {
	state = {
		post: "Loading..."
	}

	componentDidMount() {
		this.get_post();
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.post_id !== prevProps.match.params.post_id) {
			this.get_post();
		}
	}

	get_post = () => {

		axios.get(`/posts/${this.props.match.params.post_id}`)
			.then(res => {
				this.setState({ post: <UserPost2 post={res.data} /> })
			})
	}

	render() {
		return (
			<div>
				<NavigationBar authenticated />
				<NavBlocker />
				<Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center' }}>
					<Grid xs={6}>
						{this.state.post}
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default UserPostView
