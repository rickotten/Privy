import axios from 'axios';
import dayjs from 'dayjs';
import { createMessage } from "../../actions/errors";
import { toggle_subscribe } from "../../actions/pages";
import { connect } from "react-redux";
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavigationBar from "../layout/NavigationBar"
import UserPost2 from '../posts/UserPost'
import { Paper, Button, Grid } from '@material-ui/core';
import UserPostForm from '../posts/UserPostForm';


export class Page extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: "Loading...",
			owner: "Loading",
			description: "Loading...",
			dateCreated: "Loading",
			posts: []
		}
	}

	static propTypes = {
		match: PropTypes.object.isRequired, // match.params.pageID
		auth: PropTypes.object.isRequired,
		toggle_subscribe: PropTypes.func.isRequired
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
					owner: res.data.owner,
					title: res.data.title,
					description: res.data.description,
					dateCreated: res.data.date_created,
					posts: localPosts
				})
			}).catch(err => {
				console.log(err)
			})
	}

	wrapper = () => {
		this.props.toggle_subscribe(this.props.match.params.pageID);
	}

	render() {
		const { title, description, dateCreated } = this.state;
		const subscribeButton = (this.props.auth.user.username === this.state.owner) ? (<div></div>) : (<Button color="primary" onClick={this.wrapper}>Subscribe/Unsubscribe to this Page</Button>)
		return (
			<div>
				<NavigationBar/>
				<div className="card card-body">
					<UserPostForm page_id={this.props.match.params.pageID}/>
				</div>
					<Paper>
						<h1>{title}</h1>
					</Paper>
					<Paper>
						<h3>{description}</h3>
						<h4>Created on: {dayjs(dateCreated).format('MMM D, YYYY')}</h4>
						{subscribeButton}
					</Paper>
				<br></br>
				<Grid container
					direction="column"
					justify="flex-start"
					alignItems="flex-start"
					spacing={3}
				>
						{this.state.posts.length === 0 ? <h4>No Posts yet!</h4> : this.state.posts.reverse()}
				</Grid>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, { toggle_subscribe })(Page)
