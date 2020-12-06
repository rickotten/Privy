import React from 'react'
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
import { Avatar, Paper } from "@material-ui/core";
import { CheckBoxOutlineBlank, CheckBox } from '@material-ui/icons';

import NavigationBar from '../layout/NavigationBar'

const mockConvo = {
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
	"read": true
}

export function Chat({
	currentUser
}) {
	const [conversations, setConversations] = React.useState([]);
	return (
		<div>
			<NavigationBar />
			<div>
				<Paper style={{display: 'flex'}}>
					<ChatList style={{ minWidth: '30%' }}>
						<CustomChatListItem conversation={mockConvo}/>
					</ChatList>
				<CustomMessageList conversation={mockConvo} currentUsername={currentUser.username}/>
				</Paper>
			</div>
		</div>
	)
}

function CustomChatListItem ({
	conversation
}) {
	const { id, members, messages, read } = conversation
	return (
		<div>
			<ChatListItem>
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
						{read ? "Read" : "Delivered"}
					</Subtitle>
				</Column>
				
			</ChatListItem>
		</div>
	)
}

function CustomMessageList ({
	conversation,
	currentUsername
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
							<Bubble isOwn={true} style={{maxWidth: '70%'}}>
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
		</div>
	)
}


const mapStateToProps = state => ({
	currentUser: state.auth.user
})

export default connect(mapStateToProps)(Chat)
