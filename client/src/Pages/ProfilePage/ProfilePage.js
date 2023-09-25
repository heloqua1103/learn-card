import React, { useState, useEffect } from 'react'
import Popup from 'reactjs-popup'
import {
	Background,
	HeaderLayout,
	PersonalInformation,
	UpdateAvaUser,
} from '~/Layouts/Layout'
import images from '~/assets/Images'
import { TakePhotoIcon } from '~/assets/Icons'
import { Button } from '~/Components/components'
import './ProfilePage.scss'

function ProfilePage() {
	const [personalInfor, setPersonalInfor] = useState(true)
	const [accountInfor, setAccountInfor] = useState(false)
	const [data, setData] = useState([])
	const token = JSON.parse(localStorage.getItem('auth')).accessToken

	const handleToPersonalInfor = () => {
		setAccountInfor(false)
		setPersonalInfor(true)
	}

	const handleToAccountInfor = () => {
		setAccountInfor(true)
		setPersonalInfor(false)
	}

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
		<Background className={personalInfor ? 'profile__background--per' : ''}>
			<HeaderLayout />
			<div className='profile'>
				<div className='profile__ava'>
					<img
						className='profile__ava--img'
						src={data.image ? data.image : images.avatarDefault}
						alt='Avatar User'
					/>
					<div className='profile__ava--icon'>
						<Popup
							trigger={
								<Button
									className={'profile__ava--action'}
									icon={<TakePhotoIcon />}
								/>
							}
							modal
							nested>
							{close => <UpdateAvaUser onClick={close} />}
						</Popup>
					</div>
				</div>
				<div className='profile__link'>
					<p
						className={
							personalInfor
								? 'profile__link__btn profile__link__btn--active large-semibold'
								: 'profile__link__btn large-semibold'
						}
						onClick={handleToPersonalInfor}>
						Thông tin cá nhân
					</p>
					<p
						className={
							accountInfor
								? 'profile__link__btn profile__link__btn--active large-semibold'
								: 'profile__link__btn large-semibold'
						}
						onClick={handleToAccountInfor}>
						Thông tin tài khoản
					</p>
				</div>
				{personalInfor ? <PersonalInformation /> : <div></div>}
			</div>
		</Background>
	)
}

export default ProfilePage
