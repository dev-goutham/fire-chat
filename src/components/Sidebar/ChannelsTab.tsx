import { useGetRooms } from 'hooks/useGetRooms'
import React from 'react'
import { Link } from 'react-router-dom'

export const ChannelsTab: React.FC = () => {
	const rooms = useGetRooms()

	return (
		<>
			<h2 className="p-2 px-2 pt-5 text-2xl text-white">Public channels</h2>
			<ul className="my-3">
				{rooms.map((room) => (
					<Link
						to={`/channels/${room.id}`}
						className="block px-6 py-1 my-3 text-lg font-semibold tracking-wider text-gray-300 cursor-pointer"
						key={room.id}
					>
						#{room.name}
					</Link>
				))}
			</ul>
		</>
	)
}
