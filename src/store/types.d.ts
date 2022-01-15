import { User } from '@firebase/auth-types'

type IUser = User

export type IAuthContext = {
	user: IUser | null
	loading: boolean
	error: IError | string | null
	signIn: () => Promise<void>
	signOut: () => Promise<void>
}

class IAction {
	readonly type: string
}

class AuthFetching implements IAction {
	readonly type = 'AUTH_FETCHING'

	constructor(public payload: boolean) {}
}

class AuthStateChanged implements IAction {
	readonly type = 'AUTH_STATE_CHANGED'

	constructor(public payload: IUser | null) {}
}

class AuthError implements IAction {
	readonly type = 'AUTH_ERROR'

	constructor(public payload: string | null) {}
}

export type AuthReducerState = {
	user: IUser | null
	error: string | null
	fetching: boolean
}

export type AuthActions = AuthFetching | AuthError | AuthStateChanged

export type AuthReducer = (
	state: AuthReducerState | undefined,
	action: AuthActions,
) => AuthState
