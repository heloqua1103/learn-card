import React from 'react'
import './Background.scss'

function Background({ children, className }) {
	return (
		<div className={className ? `background ${className}` : 'background'}>
			{children}
		</div>
	)
}

export default Background
