import axios from 'axios';
import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, TextField } from "@material-ui/core";
import { create_page } from "../../actions/pages"
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
	root: {
		width: 350
	},
	textField: {
		fontFamily: "Nunito",
	},
	buttonWrapper: {
		display: 'flex',
		justifyContent: 'space-around'
	}
}))
export function CreatePageForm({
	auth
}) {
	const classes = useStyles();
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')

	const create_page = (title, description) => {
		// const config = tokenConfig(getState);

		// Headers 
		const config = {
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Token ${auth.token}`
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
				window.location.href = `#/pages/${res.data.id}`
			}).catch(err => {
				console.log(err);
			})
	}

	const onSubmit = (e) => {
		e.preventDefault();
		create_page(title, description);
	}

	const onChange = e => {
		switch (e.target.name) {
			case 'title':
				setTitle(e.target.value)
				break;

			case 'description':
				setDescription(e.target.value)
				break;

			default:
				console.log('error in pageform 2')
				break;
		}
	}

	return (
		<Paper className={classes.root}>
			<form onSubmit={onSubmit}>

				<TextField
					name="title"
					onChange={onChange}
					fullWidth
					multiline
					variant='outlined'
					placeholder="Create an interesting title to attract users to your page!"
					className={classes.textField}
					rows={1}></TextField>
				<TextField
					name="description"
					onChange={onChange}
					fullWidth
					multiline
					variant='outlined'
					placeholder="Create an interesting description to attract users to your page!"
					className={classes.textField}
					rows={8}></TextField>
				<div className={classes.buttonWrapper}>
					<Button
						type="submit"
						variant="outlined"
						style={{ textTransform: "none" }}
						color="primary"
					>
						Post!
					</Button>
				</div>
			</form>
		</Paper>
	)
}

const mapStateToProps = state => ({
	auth: state.auth
})
export default connect(mapStateToProps)(CreatePageForm)
