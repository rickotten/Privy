import axios from 'axios';
import React, { Component } from 'react'
import { connect } from "react-redux";
import {
	ChatList,
	ChatListItem,
	TitleBar,
	TextInput,
	MessageList,
	Message,
	MessageText,
	AgentBar,
	Title,
	Subtitle,
	MessageGroup,
	MessageButtons,
	MessageButton,
	MessageTitle,
	MessageMedia,
	TextComposer,
	Row,
	Fill,
	Fit,
	SendIcon,
	SendButton,
	EmojiIcon,
	CloseIcon,
	Column,
	RateGoodIcon,
	RateBadIcon,
	Bubble,
} from '@livechat/ui-kit'
import { AvatarGroup } from '@material-ui/lab';
import { Avatar, Paper, CircularProgress, IconButton } from "@material-ui/core";
import { CheckBoxOutlineBlank, CheckBox } from '@material-ui/icons';
import CreateIcon from '@material-ui/icons/Create';
import CancelIcon from '@material-ui/icons/Cancel';
import AddBoxIcon from '@material-ui/icons/AddBox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types'

import NavigationBar from '../layout/NavigationBar'
import { createMessage } from "../../actions/errors";

export class Chat extends Component {
	static propTypes = {
		token: PropTypes.string.isRequired,
		currentUser: PropTypes.object.isRequired,
		createAlert: PropTypes.object.isRequired
	}

	state = {
		conversations: null,
		loading: true
	}

	componentDidMount() {
		this.getConversations();
	}

	getConversations = () => {
		const { token } = this.props;
		const config = {
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Token ${token}`
			}
		}

		axios.get(`/getconvos`, config)
			.then(res => {
				this.setState({ conversations: res.data, loading: false })
			}).catch(err => {
				console.log(err)
			})
	}

	createConversation = (recipients, message) => {
		const { token, createAlert } = this.props;
		const config = {
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Token ${token}`
			}
		}
		if (recipients.length < 1) {
			createAlert("Form not valid. Did you hit the enter button after each username?")
			return;
		}
		const body = JSON.stringify({recipients, message})
		axios.post('/createconvo', body, config)
			.then(res => {
				this.setState({
					conversations: [...this.state.conversations, res.data]
				})
			}).catch(err => {
				console.log(err)
			})
	}

	sendMessage = (conversation_id, message) => {
		const { token } = this.props;
		const config = {
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Token ${token}`
			}
		}
		axios.post(`/sendmessage/${conversation_id}`, { "message": message}, config)
			.then(res => {
				console.log("message sent")
			}).catch(err => {
				console.log(err);
			})
	}

	render() {
		const { conversations, loading } = this.state;
		const { token, createAlert } = this.props;
		if (conversations === null) {
			return (
			<div>
				<NavigationBar/>
				<Paper style={{ minWidth: '100%' }}>
					<CircularProgress />
					<h2>Loading your messages</h2>
				</Paper>
			</div>
			)
		}
		else if (conversations.length > 0) {
			return (
				<div>
					<NavigationBar/>
					<ChatComponent createConversation={this.createConversation} createAlert={createAlert} token={token} conversations={conversations} currentUser={this.props.currentUser} loading={loading} sendMessage={this.sendMessage}/>
				</div>
			)
		}
		else {
			return (
				<div>
					<NavigationBar/>
					<Paper>
						<h1>No messages yet!</h1>
					</Paper>
				</div>
			)
		}
	}
}


export function ChatComponent({
	conversations,
	currentUser,
	loading,
	sendMessage,
	token,
	createAlert,
	createConversation
}) {

	const [currentConversation, setCurrentConversation] = React.useState(conversations[0]);
	const [newMessageExpand, setNewMessageExpand] = React.useState(false)

	React.useEffect(() => {
		setCurrentConversation(conversations[0])
	}, [conversations])

	const onMessageSend = (id) => (message) => {
		const formatted_message = {
			"sender": currentUser.username,
			"messageContent": message
		}

		sendMessage(id, message);
		setCurrentConversation(
			{...currentConversation,
				messages: [
					...currentConversation.messages,
					formatted_message
				]
			});
	}

	const CreateMessageHeader = () => {
		return (
			<AgentBar style={{display: 'flex', justifyContent: 'flex-end'}}>
				<Title>
					New Message
				</Title>
				<IconButton size='small' onClick={(e) => setNewMessageExpand(!newMessageExpand)}>
					<CreateIcon/>
				</IconButton>
			</AgentBar>
		)
	}

	return (
		<div style={{justifyContent: 'center', display: 'flex'}}>
				<Paper style={{ minWidth: '40%' }}>
					{!newMessageExpand && <CreateMessageHeader/>}
					{newMessageExpand && <CreateConversationForm closeForm={() => setNewMessageExpand(false)} createConversation={createConversation} />}
					<ChatList>
						{conversations.map((convo) => (<CustomChatListItem key={convo.id} conversation={convo} setCurrentConversation={setCurrentConversation} />))}
					</ChatList>
				</Paper>
				<CustomMessageList setConversation={setCurrentConversation} createAlert={createAlert} token={token} conversation={currentConversation} currentUsername={currentUser.username} onMessageSend={onMessageSend} />
		</div>
		);
}

function CreateConversationForm ({
	createConversation,
	closeForm
}) {

	const [recipients, setRecipients] = React.useState([])
	const [message, setMessage] = React.useState("")

	const options = []
	return (
		<div>
			<Autocomplete multiple
				freeSolo
				onChange={(event, value) => setRecipients(value)}
				options={options}
				renderInput={(params) => (
					<TextField
						{...params}
						label="Start a new chat. Hit enter after each user"
						placeholder="Enter usernames here"
					/>
				)}
				/>
			<TextField
				label="Type your message here"
				multiline
				rows={5}
				onChange={(e) => setMessage(e.target.value)}
				style={{width: '100%', height: '100%'}}
			/>
			<div style={{ display: 'flex', justifyContent: 'flex-end'}}>
				<IconButton onClick={closeForm}>
					<CancelIcon/>
				</IconButton>
				<IconButton onClick={() => {createConversation(recipients, message); closeForm()}}>
					<SendIcon/>
				</IconButton>
			</div>
		</div>
	)
}

// Agent Bar. (Top of message list with group chat members)
function CustomAgentBar ({
	convo_id,
	members,
	token,
	createAlert,
	setConversation
}) {
	const [expanded, setExpanded] = React.useState(false)

	const avatar = (
	<AvatarGroup max={3}>
		{members.map(member => (
			<Avatar alt={member.username} src={member.avatar_url} />
		))}
	</AvatarGroup>
	)

	const expandFriendAdd = () => {
		setExpanded(!expanded)
	}
	return (
		<AgentBar>
			<Row flexFill>
				<Column>
					{avatar}
				</Column>
				<Column flexFill>
					<Title>{members.reduce((accum, current) => (accum + current.username + ", "), "Messages with ").slice(0, -2)}</Title>
					<Subtitle >
						
						<Row>
						Add Friends!
						<IconButton onClick={expandFriendAdd}
							size={'small'}>
							<AddBoxIcon />
						</IconButton>
							{expanded ? <AddFriendsField 
							setConversation={setConversation}
							token={token}
							createAlert={createAlert}
							convo_id={convo_id}/> : <></>}
						</Row>
						
					</Subtitle>
				</Column>
			</Row>
		</AgentBar>
	)
}

function AddFriendsField({
	convo_id,
	token,
	createAlert,
	setConversation
}) {
	const [friendUsername, setFriendUsername] = React.useState("")
	const friends = []
	const submit = (event) => {
		event.preventDefault();
		add_friend_to_group()
	}

	const add_friend_to_group = () => {
		const config = {
			headers: {
				'Content-type': 'application/json',
				'Authorization': `Token ${token}`
			}
		}
		axios.get(`/addtogroup/${convo_id}/${friendUsername}`, config)
			.then(res => {
				setConversation(res.data)
			}).catch(err => {
				console.log(err);
			})
	}

	return (
		<form onSubmit={submit}>
			<Autocomplete
				freeSolo={true}
				onChange={(event, value) => setFriendUsername(value)}
				size="small"
				options={friends}
				getOptionLabel={(option) => option}
				style={{ width: 300 }}
				renderInput={(params) => <TextField {...params} onChange={(e) => setFriendUsername(e.target.value)} label="Type in username and hit enter	" size="small"
				variant="outlined" />}/>
		</form>
	);
}

// Side bar with chats
function CustomChatListItem ({
	conversation,
	setCurrentConversation
}) {
	const [hover, setHover] = React.useState(conversation.read);

	React.useEffect(() => {
		setHover(conversation.read)
	}, [conversation])

	const { id, members, messages, read } = conversation
	return (
		<ChatListItem
			onClick={() => setCurrentConversation(conversation)} 
				active={hover}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			style={{ justifyContent: 'space-between' }}
				>
			<div>
				<AvatarGroup max={5}>
					{members.map(member => (
						<Avatar alt={member.username} src={member.avatar_url} />
					))}
				</AvatarGroup>
				<Column>
					<Row justify>
						<Title ellipsis>
							{members.reduce((accumulator, current) => (accumulator + ` ${current.username}`), "Members: ")}
							</Title>
						<Subtitle nowrap>{'14:31 PM'}</Subtitle>
					</Row>
					<Row>
						<Subtitle ellipsis>
							{messages[messages.length -1].messageContent}
						</Subtitle>
					</Row>
				</Column>
			</div>
			<Column style={{paddingLeft: '5%', paddingRight: '5%'}}>
				{read && <CheckBox/>}
				{!read && <CheckBoxOutlineBlank/>}
				<Subtitle nowrap>
					{read ? "Read" : "Sent"}
				</Subtitle>
			</Column>
			
		</ChatListItem>
	)
}

// Messages in chat
function CustomMessageList ({
	conversation,
	currentUsername,
	onMessageSend,
	token,
	createAlert,
	setConversation
}) {
	const { id, members, messages, read } = conversation
	const avatars = {}
	members.forEach(member => {
		avatars[member.username] = member.avatar_url
	})
	return (
		<div style={{ borderLeft: '1px solid grey', minWidth: '60%', height:400 }}>
			<CustomAgentBar setConversation={setConversation} createAlert={createAlert} token={token} convo_id={conversation.id} members={members}/>
			<MessageList active>
			{messages.map((message) => {
				if (currentUsername === message.sender) {
					return (
						<Message isOwn={true} authorName={currentUsername}>
							<Bubble isOwn={true} style={{minWidth: 80, maxWidth: '70%'}}>
								<MessageText>
									{message.messageContent}
								</MessageText>
							</Bubble>
						</Message>
					)
				} else {
					return (
						<MessageGroup
							avatar={avatars[message.sender]}
							onlyFirstWithMeta
						>
							<Message authorName={message.sender}>
								<Bubble isOwn={false} style={{ minWidth: 80, maxWidth: '70%' }}>
									<MessageText>
										{message.messageContent}
									</MessageText>
								</Bubble>
							</Message>
						</MessageGroup>
					)
				}
			})}
			</MessageList>
			<TextComposer onSend={onMessageSend(id)} >
				<Row align="center">
					<Fill>
						<TextInput />
					</Fill>
					<Fit>
						<SendButton />
					</Fit>
				</Row>
			</TextComposer>
			<div
				style={{
					textAlign: 'center',
					fontSize: '.6em',
					padding: '.4em',
					background: '#fff',
					color: '#888',
				}}
			>
				{'Powered by P456'}
			</div>
		</div>
	)
}


const mapStateToProps = state => ({
	token: state.auth.token,
	currentUser: state.auth.user
})

const mapDispatchToProps = dispatch => ({
	createAlert: (message) => { dispatch(createMessage({ pageSubscribeFailure: message })) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
