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
	IconButton,
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
import { Avatar, Paper, CircularProgress } from "@material-ui/core";
import { CheckBoxOutlineBlank, CheckBox } from '@material-ui/icons';
import PropTypes from 'prop-types'

import NavigationBar from '../layout/NavigationBar'

export class Chat extends Component {
	static propTypes = {
		token: PropTypes.string.isRequired,
		currentUser: PropTypes.object.isRequired
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
					<ChatComponent conversations={conversations} currentUser={this.props.currentUser} loading={loading} sendMessage={this.sendMessage}/>
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
	sendMessage
}) {

	const [currentConversation, setCurrentConversation] = React.useState(conversations[0]);

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
		return (
			<div style={{justifyContent: 'center', display: 'flex'}}>
					<Paper style={{ minWidth: '40%' }}>
						<ChatList>
							{conversations.map((convo) => (<CustomChatListItem key={convo.id} conversation={convo} setCurrentConversation={setCurrentConversation} />))}
						</ChatList>
					</Paper>
					<CustomMessageList conversation={currentConversation} currentUsername={currentUser.username} onMessageSend={onMessageSend} />
			</div>
		);
}

// Side bar with chats
function CustomChatListItem ({
	conversation,
	setCurrentConversation
}) {
	const [hover, setHover] = React.useState(false);

	const { id, members, messages, read } = conversation
	return (
		<div>
			<ChatListItem
				onClick={() => setCurrentConversation(conversation)} 
				 active={hover}
				 onMouseEnter={() => setHover(true)}
				 onMouseLeave={() => setHover(false)}
				 >
				<AvatarGroup max={3}>
					{members.map(member => (
						<Avatar alt={member.username} src={member.avatar_url}/>
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
				<Column style={{paddingLeft: '5%', paddingRight: '5%'}}>
					{read && <CheckBox/>}
					{!read && <CheckBoxOutlineBlank/>}
					<Subtitle nowrap>
						{read ? "Read" : "Sent"}
					</Subtitle>
				</Column>
				
			</ChatListItem>
		</div>
	)
}

// Messages in chat
function CustomMessageList ({
	conversation,
	currentUsername,
	onMessageSend
}) {
	const { id, members, messages, read } = conversation
	const avatars = {}
	members.forEach(member => {
		avatars[member.username] = member.avatar_url
	})
	return (
		<div style={{ borderLeft: '1px solid grey', minWidth: '60%', height: 400 }}>
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
								<Bubble isOwn={false} style={{ maxWidth: '70%' }}>
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

export default connect(mapStateToProps)(Chat)
