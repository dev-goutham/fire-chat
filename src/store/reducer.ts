import { Dispatch, useReducer } from 'react'
import { AuthActions, AuthReducer, AuthReducerState } from './types.d'

const initialState: AuthReducerState = {
	user: null,
	error: null,
	fetching: true,
}

const authReducer: AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'AUTH_FETCHING': {
			return { ...state, fetching: action.payload }
		}
		case 'AUTH_STATE_CHANGED': {
			return { fetching: false, user: action.payload, error: null }
		}
		case 'AUTH_ERROR': {
			return { fetching: false, user: null, error: action.payload }
		}
		default: {
			return state
		}
	}
}

export const useAuthReducer = (): [AuthReducerState, Dispatch<AuthActions>] => {
	const [state, dispatch] = useReducer(authReducer, initialState)
	return [state, dispatch]
}
