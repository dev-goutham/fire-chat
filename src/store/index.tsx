import { useContext } from 'react'
import { AuthContext } from './context'
import { IAuthContext } from './types'

export { AuthProvider } from './context'

export const useAuth = (): IAuthContext => {
	const context = useContext(AuthContext)

	return context
}
