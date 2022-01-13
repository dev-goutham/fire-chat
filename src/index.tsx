import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import WebFont from 'webfontloader'

import App from './App'
import GlobalStyles from './lib/GlobalStyles'

const Index: React.FC = () => {
	useEffect(() => {
		WebFont.load({
			google: {
				families: ['Quicksand'],
			},
		})
	}, [])

	return (
		<React.StrictMode>
			<GlobalStyles />
			<App />
		</React.StrictMode>
	)
}

ReactDOM.render(<Index />, document.getElementById('root'))
