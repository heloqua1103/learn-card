import React, { Fragment, useEffect, useState } from 'react'
import './HomePage.scss'
import { Action, Pagination } from '~/Components/components'

import {
	HeaderLayout,
	Background,
	Footer,
	Dashborad,
	Card,
} from '~/Layouts/Layout'

function HomePage() {
	const [wordList, setWordList] = useState([])
	const [data, setdata] = useState([])
	const token = JSON.parse(localStorage.getItem('auth')).accessToken
	const page = JSON.parse(localStorage.getItem('page'))

	useEffect(() => {
		async function fetchWordList(token, page) {
			let myHeaders = new Headers()
			myHeaders.append('Authorization', `Bearer ${token}`)

			let requestOptions = {
				method: 'GET',
				headers: myHeaders,
				redirect: 'follow',
			}

			const requestUrl = `http://localhost:8000/api/listCard?page=${page}&limit=6`
			const response = await fetch(requestUrl, requestOptions)
			const responseJSON = await response.json()

			const { data, userData } = responseJSON

			setWordList(data)
			setdata(userData)
		}
		fetchWordList(token, page)
	}, [token, wordList, page])

	return (
		<Background className={'background-home'}>
			<div className='content'>
				<HeaderLayout />
				<Dashborad data={wordList} />
				<div className='list'>
					<Card data={wordList} />
				</div>
				{data && data.length !== 0 && data.listCard.length > 6 ? (
					<Pagination data={data} />
				) : (
					<Fragment />
				)}
				<Action data={wordList} />
			</div>
			<Footer />
		</Background>
	)
}

export default HomePage
