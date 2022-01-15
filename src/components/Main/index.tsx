import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AiOutlineSend } from 'react-icons/ai'
import { useAuth } from 'store'
import { Timestamp, DocumentReference } from '@firebase/firestore-types'
import { useCollection } from 'hooks/useCollections'
import { db } from 'lib/firebase'
import { format, isSameDay } from 'date-fns'
import { useLocalStorage } from 'hooks/useLocalStorage'

type IMessage = {
	id: string
	text: string
	created_at: Timestamp
	user: DocumentReference
}

const Main: React.FC = () => {
	const { pathname } = useLocation()
	const { user } = useAuth()
	const [roomInfo, setRoomInfo] = useState({
		name: '',
	})

	const [roomId, setRoomId] = useState<string | null>(null)

	useEffect(() => {
		const chatId = pathname.split('/')[2]
		setRoomId(chatId)
		db.collection('rooms')
			.doc(chatId)
			.get()
			.then((res) => {
				setRoomInfo({ name: res.data()?.name })
			})
	}, [pathname])

	return (
		<div className="flex flex-col flex-1 h-full overflow-x-hidden">
			<div className="flex justify-between w-full px-6 py-4 align-middle bg-gray-700">
				<div className="flex gap-6 leading-none text-white align-middle ">
					<div>
						<img className="w-12 h-12" src="/logo.png" alt="logo" />
					</div>
					<h2 className="self-center font-serif text-xl font-bold">
						Fire Chat
					</h2>
				</div>
				<div className="self-center text-xl leading-none text-white">
					#{roomInfo.name}
				</div>
			</div>
			<div className="relative flex-1 w-full min-w-full px-6 overflow-scroll bg-gray-800 color-gray-50">
				{roomId && (
					<>
						<div
							className="grid h-full"
							style={{
								gridTemplateRows: '1fr auto',
							}}
						>
							<Messages roomId={roomId} />
							<ChatInput chatId={roomId} uid={user?.uid as string} />
						</div>
					</>
				)}
			</div>
		</div>
	)
}

const Messages: React.FC<{ roomId: string }> = ({ roomId }) => {
	const query = React.useMemo(
		() =>
			db
				.collection('rooms')
				.doc(roomId)
				.collection('messages')
				.orderBy('created_at'),
		[roomId],
	)

	const scrollerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!scrollerRef.current) {
			return
		}
		scrollerRef.current.scrollIntoView({ behavior: 'smooth' })
	})

	const { data: messages } = useCollection<IMessage>(query)

	const shouldShowAvatar = (
		prevMessage: IMessage | undefined,
		message: IMessage,
	) => {
		const firstMessage = !prevMessage
		if (firstMessage) {
			return true
		}

		const differentUser = prevMessage?.user.id !== message.user.id
		if (differentUser) {
			return true
		}

		const timeBetweenMessages =
			message.created_at.seconds - prevMessage.created_at.seconds
		if (timeBetweenMessages > 60) {
			return true
		}

		return false
	}

	const shouldShowDay = (
		prevMessage: IMessage | undefined,
		message: IMessage,
	) => {
		const firstMessage = !prevMessage
		if (firstMessage) {
			return true
		}

		const isNewDay = !isSameDay(
			prevMessage.created_at.toDate(),
			message.created_at.toDate(),
		)

		return isNewDay
	}

	return (
		<div className="w-full text-white">
			{messages.map((message, i) => {
				const prev = messages[i - 1]
				const showAvatar = shouldShowAvatar(prev, message)
				const showDay = shouldShowDay(prev, message)
				return (
					<div key={message.id}>
						<Message
							showAvatar={showAvatar}
							showDay={showDay}
							message={message.text}
							userRef={message.user}
							created_at={message.created_at}
						/>
					</div>
				)
			})}
			<div className="pb-20" ref={scrollerRef}></div>
		</div>
	)
}

const Message: React.FC<{
	showAvatar: boolean
	showDay: boolean
	userRef: DocumentReference
	message: string
	created_at: Timestamp
}> = ({ showAvatar, message, showDay, userRef, created_at }) => {
	return (
		<>
			{showAvatar ? (
				<MessageWithAvatar
					message={message}
					showDay={showDay}
					userRef={userRef}
					created_at={created_at}
				/>
			) : (
				<MessageWithNoAvatar message={message} />
			)}
		</>
	)
}

const MessageWithNoAvatar: React.FC<{ message: string }> = ({ message }) => {
	return (
		<div className="ml-10 no-avatar">
			<div className="MessageContent">{message}</div>
		</div>
	)
}

const MessageWithAvatar: React.FC<{
	message: string
	showDay: boolean
	userRef: DocumentReference
	created_at: Timestamp
}> = ({ message, userRef, showDay, created_at }) => {
	const getUser = React.useCallback(async () => {
		const res = (await userRef.get()).data() as {
			name: string
			photoURL: string
		}

		return { ...res, id: userRef.id }
	}, [userRef])

	const user = useLocalStorage<{
		name: string
		photoURL: string
	}>(userRef.id, getUser)

	return (
		<div className="mt-2">
			{showDay && (
				<div className="flex mt-2 ml-8 align-center">
					<div className="flex-1 h-2 " />
					<div className="DayText">{format(created_at.toDate(), 'PPP')}</div>
					<div className="flex-1 h-2 " />
				</div>
			)}
			<div className="flex with-avatar">
				<img
					className="w-8 h-8 rounded-full"
					src={user?.photoURL || 'https://placekitten.com/64/64'}
				/>
				<div className="ml-2">
					<div className="text-xs font-gray-200text-xs font-gray-200">
						<span className="mr-1 font-semibold">{user?.name || 'name'}</span>
						<span> </span>
						<span className="TimeStamp">
							{format(created_at.toDate(), 'hh:mm aaa')}
						</span>
					</div>
					<div className="MessageContent">{message}</div>
				</div>
			</div>
		</div>
	)
}

const ChatInput: React.FC<{ chatId: string; uid: string }> = ({
	chatId,
	uid,
}) => {
	const messageRef = useRef<HTMLInputElement | null>(null)

	const sendMessage: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		if (!messageRef.current) {
			return
		}

		await db
			.collection('rooms')
			.doc(chatId)
			.collection('messages')
			.add({
				text: messageRef.current.value,
				created_at: new Date(),
				user: db.collection('users').doc(uid),
			})
		messageRef.current.value = ''
	}
	return (
		<div className="fixed w-3/4 py-4 bottom-4">
			<div>
				<form onSubmit={sendMessage} className="relative">
					<input
						type="text"
						className="w-full px-4 py-4 font-semibold rounded-xl text:text-gray-800 placeholder:text-gray-400"
						placeholder="Speak your mind"
						ref={messageRef}
					/>
					<div className="absolute right-2 top-4">
						<AiOutlineSend className="w-6 h-6 text-gray-700" />
					</div>
				</form>
			</div>
		</div>
	)
}

export default Main
