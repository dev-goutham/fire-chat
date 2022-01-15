import firebase from 'firebase'
import { db } from 'lib/firebase'
import React, { useRef, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { MdAddCircle } from 'react-icons/md'
import { useAuth } from 'store'

export const Search: React.FC = () => {
	const { user } = useAuth()
	const [results, setResults] = useState<{ name: string; id: string }[]>([])

	const inputRef = useRef<HTMLInputElement | null>(null)

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault()
		if (!inputRef.current || inputRef.current.value.length < 1) {
			return
		}

		const { docs } = await db
			.collection('rooms')
			.where('name', '==', inputRef.current.value)
			.get()
		const res = docs.map((d) => d.data()) as { name: string; id: string }[]
		setResults(() => res)
	}

	const subscribe = (id: string) => {
		db.collection('rooms')
			.doc(id)
			.update({
				subscribers: firebase.firestore.FieldValue.arrayUnion(
					db.collection('users').doc(user?.uid),
				),
			})
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="relative py-4 mt-2 overflow-hidden bg-gray-600">
					<BiSearchAlt className="absolute w-6 h-6 text-gray-100 top-4 left-1" />
					<input
						className="w-full ml-8 overflow-hidden text-gray-100 bg-transparent focus:outline-none"
						type="text"
						placeholder="Search for public chat rooms"
						ref={inputRef}
					></input>
				</div>
			</form>
			<div className="mt-2">
				{results.map((r, i) => (
					<div
						className="flex justify-between w-full gap-2 px-4 py-2 font-semibold text-center align-middle bg-blue-400"
						key={i}
					>
						<div>{r.name}</div>
						<MdAddCircle
							onClick={() => subscribe(r.id)}
							className="w-8 h-8 text-green-900 cursor-pointer"
						/>
						{/* <div> */}
						{/* </div> */}
					</div>
				))}
			</div>
		</div>
	)
}
