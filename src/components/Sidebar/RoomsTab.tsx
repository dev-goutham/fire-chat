import React from 'react'
import { Link } from 'react-router-dom'

import { useGetRooms } from './hooks/useGetRooms'

export const RoomsTab: React.FC = () => {
	const rooms = useGetRooms()

	return (
		<>
			<h2 className="p-2 px-2 pt-5 text-2xl text-white">Chat Rooms</h2>
			<ul className="my-3">
				{rooms.map((room) => (
					<Link
						to={`/rooms/${room.id}`}
						className="block px-3 py-3 my-3 font-serif text-xl font-semibold tracking-wider text-center text-gray-700 shadow-lg cursor-pointer bg-stone-300"
						key={room.id}
					>
						{room.name}
					</Link>
				))}
			</ul>
		</>
	)
}
