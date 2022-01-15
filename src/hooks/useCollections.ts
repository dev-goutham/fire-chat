import { Query } from '@firebase/firestore-types'
import { useEffect, useState } from 'react'
// import { Query } from "@firebase/firestore-types";

export const useCollection = <T>(
	query: Query,
): { data: T[]; loading: boolean } => {
	const [docs, setDocs] = useState<T[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		try {
			const unsub = query.onSnapshot((snap) => {
				const data: T[] = snap.docs.map(
					(doc) => ({ ...doc.data(), id: doc.id } as unknown),
				) as T[]
				setDocs(() => data)
				setLoading(false)
			})

			return () => {
				setDocs([])
				setLoading(true)
				unsub()
			}
		} catch (error) {
			return
		}
	}, [query])

	return { data: docs, loading }
}
