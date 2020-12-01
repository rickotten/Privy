import axios from 'axios';
import dayjs from 'dayjs';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavigationBar from "../layout/NavigationBar"
import UserPost2 from '../posts/UserPost'
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import UserPostForm from '../posts/UserPostForm';


export class Page extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: "Loading...",
			description: "Loading...",
			dateCreated: "Loading",
			posts: []
		}
	}

	static propTypes = {
		match: PropTypes.object.isRequired // match.params.pageID
	}

	componentDidMount() {
		this.getPage();
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.pageID !== prevProps.match.params.pageID) {
			this.getPage();
		}
	}

	getPage() {
		axios.get(`/pages/${this.props.match.params.pageID}`)
			.then(res => {
				const localPosts = []
				res.data.posts.forEach(post => {
					localPosts.push(<Grid key={post.id} item><UserPost2 post={post} /></Grid>);
				})
				this.setState({
					title: res.data.title,
					description: res.data.description,
					dateCreated: res.data.date_created,
					posts: localPosts
				})
			}).catch(err => {
				console.log(err)
			})
	}

	render() {
		const { title, description, dateCreated } = this.state;
		return (
			<div>
				<NavigationBar/>
				<div className="card card-body">
					<UserPostForm page_id={this.props.match.params.pageID}/>
				</div>
				<Grid>
					<Paper>
						<h1>{title}</h1>
					</Paper>
					<Paper>
						<h3>{description}</h3>
						<h4>Created on: {dayjs(dateCreated).format('MMM D, YYYY')}</h4>
					</Paper>
				</Grid>
				<Grid container
					direction="column"
					justify="flex-start"
					alignItems="flex-start"
				>
					<Paper>
						{this.state.posts.length === 0 ? <h4>No Posts yet!</h4> : this.state.posts.reverse()}
					</Paper>
				</Grid>
			</div>
		)
	}
}

export default Page
