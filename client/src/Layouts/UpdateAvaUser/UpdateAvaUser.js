import React, { useState, useEffect, useRef } from 'react'
import images from '~/assets/Images'
import { UploadIcon } from '~/assets/Icons'
import { Button, Toast } from '~/Components/components'
import { toast } from 'react-toastify'
import './UpdateAvaUser.scss'

function UpdateAvaUser({ onClick }) {
	const [data, setData] = useState([])
	const [avater, setAvater] = useState([])
	const [file, setFile] = useState('')
	const token = JSON.parse(localStorage.getItem('auth')).accessToken
	const inputElement = useRef()

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

	const uploadFile = () => {
		inputElement.current.click()
	}

	const loadFile = e => {
		const file = e.target.files[0]
		if (!file) return
		setFile(URL.createObjectURL(file))
		setAvater(file)
	}

	const uploadAvaUser = (token, id, file) => {
		let myHeaders = new Headers()
		myHeaders.append('Authorization', `Bearer ${token}`)

		var formdata = new FormData()
		formdata.append('avatar', file)

		var requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: formdata,
			redirect: 'follow',
		}

		fetch(`http://localhost:8000/api/user/upload-avatar/${id}`, requestOptions)
			.then(response => response.json())
			.then(result => {
				if (result?.success) {
					toast.success('Cập nhập ảnh thành công!')
					onClick()
				} else {
					toast.error('vui lòng thêm ảnh vào!')
				}
			})
			.catch(error => console.log('error', error))
	}

	return (
		<div className='upload__ava'>
			<div className='upload__ava--main' onClick={uploadFile}>
				<input type='file' hidden ref={inputElement} onChange={loadFile} />
				<div className='upload__ava--icon'>
					<UploadIcon />
				</div>
				<div className='upload__ava--img'>
					<img
						src={file ? file : data.image ? data.image : images.avatarDefault}
						alt='Avatar user'
					/>
					<span className='normal-regular'>Tải ảnh lên</span>
				</div>
			</div>
			<div className='upload__ava--btn'>
				<Button
					className={'upload__ava--button upload__ava--button__cancel'}
					children={'Hủy'}
					onClick={onClick}
				/>
				<Button
					className={'upload__ava--button upload__ava--button__accept'}
					children={'Đồng ý'}
					onClick={onClick => uploadAvaUser(token, data._id, avater, onClick)}
				/>
			</div>
			<Toast position={'top-center'} className={'upload__ava--toast'} />
		</div>
	)
}

export default UpdateAvaUser
