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

const mockConvos = [
	{
		"id": 1,
		"members": [
			{
				"username": "user",
				"avatar_url": "http://localhost:8000/media/profileFile/pig_FQgWgSD.jpg"
			},
			{
				"username": "ninja",
				"avatar_url": "http://localhost:8000/media/profileFile/zebra.jpg"
			}
		],
		"messages": [
			{
				"sender": "user",
				"messageContent": "hello world how are you i am doing finasdfasdfasdfasdfe thank you for asking oh guess you didn't :("
			},
			{
				"sender": "ninja",
				"messageContent": "hello world how are you i am doing finasdfasdfasdfasdfe thank you for asking oh guess you didn't :("
			}
		],
		"read": false
	},
	{
		"id": 2,
		"members": [
			{
				"username": "user",
				"avatar_url": "http://localhost:8000/media/profileFile/pig_FQgWgSD.jpg"
			},
			{
				"username": "ninja",
				"avatar_url": "http://localhost:8000/media/profileFile/zebra.jpg"
			}
		],
		"messages": [
			{
				"sender": "ninja",
				"messageContent": "hello world how are you i am doing finasdfasdfasdfasdfe thank you for asking oh guess you didn't :("
			},
			{
				"sender": "user",
				"messageContent": "hello world how are you i am doing finasdfasdfasdfasdfe thank you for asking oh guess you didn't :("
			}
		],
		"read": true
	}
]

export class Chat extends Component {
	static propTypes = {
		token: PropTypes.string.isRequired,
		currentUser: PropTypes.object.isRequired
	}

	render() {
		return (
			<ChatComponent currentUser={this.props.currentUser}/>
		)
	}
}


export function ChatComponent({
	currentUser
}) {
	const [currentConversation, setCurrentConversation] = React.useState(mockConvos[0]);

	const onMessageSend = (message) => {
		const formatted_message = {
			"sender": currentUser.username,
			"messageContent": message
		}
		
		setCurrentConversation(
			{...currentConversation,
				messages: [
					...currentConversation.messages,
					formatted_message
				]
			}
			);
	}

	return (
		<div>
			<NavigationBar />
			<div>
				<Paper style={{display: 'flex'}}>
					<div style={{ minWidth: '30%' }}>
						<ChatList>
							{mockConvos.map((convo) => (<CustomChatListItem key={convo.id} conversation={convo} setCurrentConversation={setCurrentConversation} />))}
						</ChatList>
					</div>
					<CustomMessageList conversation={currentConversation} currentUsername={currentUser.username} onMessageSend={onMessageSend}/>
				</Paper>
			</div>
		</div>
	)
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
			<TextComposer onSend={onMessageSend}>
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
