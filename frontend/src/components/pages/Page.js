import axios from 'axios';
import { toggle_subscribe } from "../../actions/pages";
import { connect } from "react-redux";
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavigationBar from "../layout/NavigationBar2"
import UserPost2 from '../posts/UserPost'
import { Button, Grid } from '@material-ui/core';
import UserPostForm from '../posts/UserPostForm';
import PageHeader from './PageHeader'
import NavBlocker from "../../util/NavBlocker";
import { withStyles } from "@material-ui/core";
import Footer from "../layout/Footer";

const useStyles = theme => ({
	root: {
		minHeight: '100vh'
	},
	text: {
		fontFamily: 'Nunito',
		fontWeight: 'bold',
		color: '#fff',
		display: 'flex',
		justifyContent: 'center'
	},
})
export class Page extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: "Loading...",
			owner: "Loading",
			description: "Loading...",
			dateCreated: "Loading",
			posts: [],
			members: [],
			reload: false
		}
	}

	static propTypes = {
		match: PropTypes.object.isRequired, // match.params.pageID
		auth: PropTypes.object.isRequired,
		toggle_subscribe: PropTypes.func.isRequired,
		classes: PropTypes.object.isRequired
	}

	componentDidMount() {
		console.log(this.props)
		this.getPage();
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.pageID !== prevProps.match.params.pageID || this.state.reload) {
			this.getPage();
		}
	}

	reload = () => {
		this.setState({ reload: true })
	}

	getPage() {
		console.log(this.props.match.params.pageID)
		axios.get(`/pages/${this.props.match.params.pageID}`)
			.then(res => {
				const localPosts = []
				res.data.posts.forEach(post => {
					localPosts.push(
						<UserPost2 reload={this.reload} key={post.id} post={post} />
					)
				})
				this.setState({
					owner: res.data.owner,
					title: res.data.title,
					description: res.data.description,
					dateCreated: res.data.date_created,
					posts: localPosts,
					members: res.data.members
				})
			}).catch(err => {
				console.log(err)
			})
	}

	wrapper = () => {
		this.props.toggle_subscribe(this.props.match.params.pageID);
	}

	render() {
		const classes = this.props.classes
		const { title, description, dateCreated, owner, members, posts } = this.state;
		const subscribeButton = (this.props.auth.user.username === this.state.owner) ? (<div></div>) : (<Button color="primary" onClick={this.wrapper}>Subscribe/Unsubscribe to this Page</Button>)
		return (
			<div className={classes.root}>
				<NavigationBar authenticated />
				<NavBlocker />
				<PageHeader
					title={title}
					description={description}
					dateCreated={dateCreated}
					owner={owner}
					members={members}
					subscribeButton={subscribeButton}
				/>
				<Grid container spacing={3}>
					{this.state.posts.length === 0 && <Grid item xs><h4 className={classes.text}>No Posts yet!</h4></Grid>}
					{this.state.posts.length !== 0 && posts.reverse().map(each => (<Grid item xs={6}>{each}</Grid>))}
				</Grid>
				<Footer reload={this.reload} postable page={this.props.match.params.pageID} />
			</div >
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, { toggle_subscribe })(withStyles(useStyles)(Page))
