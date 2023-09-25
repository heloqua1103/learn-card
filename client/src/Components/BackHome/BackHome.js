import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '~/assets/Icons'
import './BackHome.scss'

function BackHome({ children = 'Quay lại', to, className }) {
	return (
		<div className={!className ? 'back__home' : `back__home ${className}`}>
			<ArrowLeftIcon />
			<Link className='large-semibold' to={to}>
				{children}
			</Link>
		</div>
	)
}

export default BackHome
