import axios from 'axios';
import dayjs from 'dayjs';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavigationBar from "../layout/NavigationBar"
import UserPost2 from '../posts/UserPost'
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';


export class Page extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: "Loading...",
			description: "Loading...",
			dateCreated: "11/9/2020",
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
				<Grid>
					<div className="card card-body">
						<Paper>
							<h1 className="textColor">{title}</h1>
							<h3 className="textColor">{description}</h3>
							<h4 className="textColor">Created on: {dayjs(dateCreated).format('MMM D, YYYY')}</h4>
						</Paper>
					</div>
				</Grid>
				<Grid container
					direction="column"
					justify="flex-start"
					alignItems="flex-start"
				>
					{this.state.posts}
				</Grid>
			</div>
		)
	}
}

export default Page
