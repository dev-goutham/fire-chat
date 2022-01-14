import React from 'react'
import { BiLogOutCircle } from 'react-icons/bi'
import { useAuth } from 'store'

export const Header: React.FC = () => {
	const { user, signOut } = useAuth()

	return (
		<div className="flex items-center justify-between p-4 bg-gray-600">
			<div className="flex items-center">
				<img
					className="w-12 h-12 mr-2 rounded-full"
					src={user?.photoURL as unknown as string}
					alt="display picture"
				/>
				<p className="text-lg font-semibold text-white">{user?.displayName}</p>
			</div>
			<button onClick={signOut}>
				<BiLogOutCircle className="w-6 h-6 text-white" />
			</button>
		</div>
	)
}
