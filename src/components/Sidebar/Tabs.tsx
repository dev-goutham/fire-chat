import React, { useState } from 'react'
import { BsChatSquareFill, BsFillPeopleFill } from 'react-icons/bs'

export const Tabs: React.FC<{
	changeTab: (tabName: 'Rooms' | 'Users') => void
}> = ({ changeTab }) => {
	const [selected, setSelected] = useState<'Rooms' | 'Users'>('Rooms')

	return (
		<div className="w-full gap-0 py-2 leading-none bg-gray-500">
			<div className="flex align-middle justify-evenly">
				<button
					className={`px-8 py-4 rounded-md cursor-pointer  ${
						selected === 'Rooms'
							? 'bg-amber-300 hover:bg-amber-400'
							: 'bg-gray-300 hover:bg-gray-200'
					} `}
					onClick={() => {
						setSelected('Rooms')
						changeTab('Rooms')
					}}
				>
					<BsChatSquareFill className="w-6 h-6 text-gray-700" />
				</button>
				<button
					className={`px-8 py-4 rounded-md cursor-pointer  ${
						selected === 'Users'
							? 'bg-amber-300 hover:bg-amber-400'
							: 'bg-gray-300 hover:bg-gray-200'
					} `}
					onClick={() => {
						setSelected('Users')
						changeTab('Users')
					}}
				>
					<BsFillPeopleFill className="w-6 h-6 text-gray-700" />
				</button>
			</div>
		</div>
	)
}
