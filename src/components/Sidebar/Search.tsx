import React, { useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'

export const Search: React.FC = () => {
	const [results, setResults] = useState()

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="relative py-4 overflow-hidden bg-gray-500">
					<BiSearchAlt className="absolute text-gray-600 top-6 left-3" />
					<input
						className="w-full ml-8 overflow-hidden bg-transparent focus:outline-none"
						type="text"
						placeholder="Search for users or rooms"
					></input>
				</div>
			</form>
		</div>
	)
}
