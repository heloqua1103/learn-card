import React, { useState, useEffect } from 'react'
import { BackHome } from '~/Components/components'
import {
	HeaderLayout,
	BlogUser,
	FolderShare,
	SidebarInfor,
} from '~/Layouts/Layout'
import './InformationUserPage.scss'

function InformationUserPage() {
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
	}, [token])

	return (
		<div className='infor'>
			<HeaderLayout />
			<BackHome to={'/home'} className={'infor__back'} />
			<div className='infor__container'>
				<div className='infor__sidebar'>
					<SidebarInfor data={data} />
					<div className='infor__sidebar--bottom'>
						<h1 className='infor__sidebar--bottom-title'>Thống kê</h1>
					</div>
				</div>
				<div className='infor__main'>
					<FolderShare />
					<BlogUser />
				</div>
			</div>
		</div>
	)
}

export default InformationUserPage
