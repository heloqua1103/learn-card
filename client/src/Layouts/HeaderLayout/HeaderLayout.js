import React, { useEffect, useState } from 'react'
import './HeaderLayout.scss'
import { Information } from '~/Components/components'

import { Link } from 'react-router-dom'

function HeaderLayout() {
	const [data, setData] = useState([])
	const token = JSON.parse(localStorage.getItem('auth')).accessToken

	useEffect(() => {
		async function fetchWordList(token) {
			let myHeaders = new Headers()
			myHeaders.append('Authorization', `Bearer ${token}`)

			let requestOptions = {
				method: 'GET',
				headers: myHeaders,
				redirect: 'follow',
			}

			const requestUrl = 'http://localhost:8000/api/user/current'
			const response = await fetch(requestUrl, requestOptions)
			const responseJSON = await response.json()

			const { mes } = responseJSON

			setData(mes)
		}
		fetchWordList(token)
	}, [token, data])

	return (
		<div className='header'>
			<div className='header--left'>
				<Link to={'/home'}>
					<h1 className='header__title'>LearnCard</h1>
				</Link>
			</div>
			<div className='header--right'>
				<Information data={data} />
			</div>
		</div>
	)
}

export default HeaderLayout
