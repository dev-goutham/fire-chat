import { onSnapshot } from 'firebase/firestore'
import { firestore } from 'lib/firebase'
import { doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuth } from 'store'

export const useGetRooms = (): {
	name: string
	id: string
}[] => {
	const { user } = useAuth()

	const [rooms, setRooms] = useState<
		{
			name: string
			id: string
		}[]
	>([])

	useEffect(() => {
		const unsub = onSnapshot(
			doc(firestore, 'users', user?.uid as string),
			(doc) => {
				const { rooms } = doc.data() as {
					rooms: {
						name: string
						id: string
					}[]
				}
				setRooms(() => rooms)
			},
		)
		return unsub
	}, [])

	return rooms
}
