import { db } from 'lib/firebase'
import React, { useEffect, useState } from 'react'

export const LiveUsers: React.FC = () => {
	const [liveUsers, setLiveUSers] = useState<{ name: string }[]>([])

	useEffect(() => {
		const unsub = db
			.collection('users')
			.where('is_online', '==', true)
			.onSnapshot((snap) => {
				const users = snap.docs.map((doc) => ({ name: doc.data().name }))
				setLiveUSers(() => users)
			})
		return unsub
	}, [])

	return (
		<>
			<h2 className="p-2 px-2 pt-5 text-2xl text-white">Live Users</h2>
			<ul className="my-3">
				{liveUsers.map((user, i) => (
					<li
						className="block px-6 py-1 my-3 text-lg font-semibold tracking-wider text-gray-300 cursor-pointer"
						key={i}
					>
						<span className="inline-block w-3 h-3 mr-2 bg-green-500 rounded-full"></span>
						<span>{user.name}</span>
					</li>
				))}
			</ul>
		</>
	)
}
