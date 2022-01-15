import { useCallback, useState, useEffect } from 'react'

export const useLocalStorage = <T>(
	key: string,
	callback: () => Promise<T>,
): T | null => {
	const [state, setState] = useState<T | null>(null)

	const fetchFromStorage = useCallback(async () => {
		const userFromStorage = window.localStorage.getItem(key)
		if (!userFromStorage) {
			const res = (await callback()) as T
			setState(res)
			window.localStorage.setItem(key, JSON.stringify(res))
		} else {
			const parsedItem = JSON.parse(userFromStorage) as T
			setState(parsedItem)
		}
	}, [key, callback])

	useEffect(() => {
		fetchFromStorage()
	}, [fetchFromStorage])

	return state
}
