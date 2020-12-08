import axios from 'axios';
import { toggle_subscribe } from "../../actions/pages";
import { connect } from "react-redux";
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavigationBar from "../layout/NavigationBar"
import UserPost2 from '../posts/UserPost'
import { Button, Grid } from '@material-ui/core';
import UserPostForm from '../posts/UserPostForm';
import PageHeader from './PageHeader'


export class Page extends Component {
	constructor(props) {
		super(props)
		this.state = {
			title: "Loading...",
			owner: "Loading",
			description: "Loading...",
			dateCreated: "Loading",
			posts: [],
			members: []
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
					localPosts.push(
						<UserPost2 key={post.id} post={post} />
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
		const { title, description, dateCreated, owner, members } = this.state;
		console.log(members)
		const subscribeButton = (this.props.auth.user.username === this.state.owner) ? (<div></div>) : (<Button color="primary" onClick={this.wrapper}>Subscribe/Unsubscribe to this Page</Button>)
		return (
			<div>
				<NavigationBar/>
				<PageHeader
					title={title}
					description={description}
					dateCreated={dateCreated}
					owner={owner}
					members={members}
					subscribeButton={subscribeButton}
				/>
				<div className="card card-body">
					<UserPostForm page_id={this.props.match.params.pageID}/>
				</div>
				{/* <div style={{display: 'flex', justifyContent: 'center'}}> */}
					<div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
							{this.state.posts.length === 0 ? <h4>No Posts yet!</h4> : this.state.posts.reverse()}
					</div>
				{/* </div> */}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, { toggle_subscribe })(Page)
