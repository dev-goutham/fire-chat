import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import WebFont from 'webfontloader'
import 'index.css'

import App from './App'
import { AuthProvider } from 'store'

const Index: React.FC = () => {
	useEffect(() => {
		WebFont.load({
			google: {
				families: ['Quicksand', 'Merriweather'],
			},
		})
	}, [])

	return (
		<React.StrictMode>
			<AuthProvider>
				<App />
			</AuthProvider>
		</React.StrictMode>
	)
}

ReactDOM.render(<Index />, document.getElementById('root'))
