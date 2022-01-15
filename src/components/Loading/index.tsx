import React from 'react'
import './loading.css'

const Loading: React.FC = () => {
	return (
		<div className="loading-body-container">
			<div className="loading-container">
				<div className="loading"></div>
				<div className="loading-text">Loading</div>
			</div>
		</div>
	)
}

export default Loading
