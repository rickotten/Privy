import React, { useState } from 'react'
import { connect } from "react-redux";
import { makeStyles, Button, TextField, Paper } from "@material-ui/core";
import { create_user_post } from '../../actions/posts';

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
export function UserPostForm({
	create_user_post,
	page_id,
	reload
}) {
	const classes = useStyles();
	const [textPost, setTextPost] = useState('');
	const [media, setMedia] = useState('');
	const [uploadButtonText, setUploadButtonText] = useState("Upload File")

	const onSubmit = e => {
		e.preventDefault();
		console.log(textPost);
		console.log(media);
		create_user_post(textPost, media, page_id, reload);
	}

	const onChange = e => {
		switch (e.target.name) {
			case 'media':
				setUploadButtonText('File Uploaded!')
				setMedia(e.target.files[0]);
				break;

			case 'textPost':
				setTextPost(e.target.value);
				break;

			default:
				break;
		}
	}

	return (
		<Paper className={classes.root}>
			<form onSubmit={onSubmit}>
				<TextField
					name="textPost"
					onChange={onChange}
					fullWidth
					multiline
					placeholder="Post something interesting to share with your friends!"
					className={classes.textField}
					rows={8}>

				</TextField>
				<div className={classes.buttonWrapper}>
					<Button
						variant="outlined"
						style={{ textTransform: "none" }}
						color="primary"
						component="label"
					>
						{uploadButtonText}
						<input
							type="file"
							name="media"
							onChange={onChange}
							hidden
						/>
					</Button>
					<Button
						type="submit"
						variant="outlined"
						style={{ textTransform: "none" }}
						color="primary"
					>
						Post!
				</Button>
				</div>
				{/* <img src="..\static\images\pen_icon.png" alt="pen" width="30%" height="40%"></img> */}
			</form >
		</Paper>
	)
}

export default connect(null, { create_user_post })(UserPostForm)
