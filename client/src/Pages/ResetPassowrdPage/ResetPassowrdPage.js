/* eslint-disable no-dupe-keys */
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import joi from 'joi'
import { toast } from 'react-toastify'
import { Background } from '~/Layouts/Layout'
import { Button, BackHome, Toast } from '~/Components/components'
import { EyeIcon, EyeSlashIcon } from '~/assets/Icons'
import { passwordJoi } from '~/helpers/joi_validator'
import './ResetPassowrdPage.scss'

function ResetPassowrdPage() {
	const { resetToken } = useParams()
	const navigate = useNavigate()

	const [password, setPassword] = useState('')
	const [passwordAgain, setpasswordAgain] = useState('')
	const [passwordShow, setPasswordShow] = useState(false)
	const [checkPassword, setCheckPassword] = useState(false)
	const [checkPasswordAgain, setCheckPasswordAgain] = useState(false)
	const [messErr, setMessErr] = useState({
		passwordErr: '',
		passwordAgainErr: '',
	})

	const handleChangePassword = e => {
		const value = e.target.value

		const { error } = joi
			.object({ passwordJoi })
			.validate({ passwordJoi: value })

		if (value.startsWith(' ')) {
			setCheckPassword(true)
			setMessErr({
				...messErr,
				passwordErr: 'không thể bắt đầu bằng dấu " "!',
			})
		} else if (error) {
			setPassword(value)
			setCheckPassword(true)
			setMessErr({
				...messErr,
				passwordErr:
					'Vui lòng nhập mật khẩu ( không dưới 3 ký tự và trên 30 ký tự, không có ký tự đặt biệt )!',
			})
		} else {
			setPassword(value)
			setCheckPassword(false)
		}
	}

	const handleChangePasswordAgain = e => {
		const value = e.target.value

		if (value.startsWith(' ')) {
			setCheckPasswordAgain(true)
			setMessErr({
				...messErr,
				passwordAgainErr: 'không thể bắt đầu bằng dấu " "!',
			})
		} else if (password !== value) {
			setpasswordAgain(value)
			setCheckPasswordAgain(true)
			setMessErr({
				...messErr,
				passwordAgainErr: 'Mật khẩu không đúng',
			})
		} else {
			setpasswordAgain(value)
			setCheckPasswordAgain(false)
		}
	}

	const handleClickShowPassword = () => {
		setPasswordShow(!passwordShow)
	}

	const submit = () => {
		if (password === passwordAgain) {
			var urlencoded = new URLSearchParams()
			urlencoded.append('token', resetToken)
			urlencoded.append('password', password)

			fetch('http://localhost:8000/api/user/resetpassword', {
				method: 'PUT',
				redirect: 'follow',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: urlencoded,
				redirect: 'follow',
			})
				.then(response => response.json())
				.then(result => {
					if (result?.success) {
						toast.success('Cập nhật thành công vui lòng đợi đến trang chủ')
						setTimeout(() => {
							navigate('/home')
						}, 3000)
					} else {
						switch (result?.mess) {
							case 'Missing inputs':
								toast.error('Vui lòng nhập thông tin!')
								break
							case 'Missing email':
								toast.error('Đã hết thời gian cập nhật')
								break
							case 'Something went wrong':
								toast.error(
									'Đã xảy ra sự cố. Vui lòng kiểm tra lại đường truyền mạng!',
								)
								break
							default:
								toast.error('Không thể kết nối máy chủ!!!')
						}
					}
				})
				.catch(error => console.log('error', error))
		} else {
			toast.error(messErr.passwordAgainErr)
		}
	}

	return (
		<Background>
			<BackHome children={'Đăng nhập'} to={'/login'} />
			<div className='resetPass'>
				<h1 className='resetPass__title'>Cập Nhập Mật Khẩu Mới</h1>
				<div className='resetPass__form'>
					<div className='resetPass__field'>
						<div
							className={
								checkPassword
									? 'resetPass__field--item resetPass__field--err'
									: 'resetPass__field--item'
							}>
							<input
								className='resetPass__field--input normal-regular'
								type={!passwordShow ? 'password' : 'text'}
								placeholder='Nhập mật khẩu mới'
								value={password}
								onChange={handleChangePassword}
							/>
							<div
								className='resetPass__field--icon resetPass__field--icon-eye'
								onClick={handleClickShowPassword}>
								{!passwordShow ? <EyeSlashIcon /> : <EyeIcon />}
							</div>
						</div>
						{checkPassword && (
							<p className='resetPass__field--noteErr normal-regular'>
								{messErr.passwordErr}
							</p>
						)}
					</div>
					<div className='resetPass__field'>
						<div
							className={
								checkPasswordAgain
									? 'resetPass__field--item resetPass__field--err'
									: 'resetPass__field--item'
							}>
							<input
								className='resetPass__field--input normal-regular'
								type={!passwordShow ? 'password' : 'text'}
								placeholder='Nhập mật khẩu mới'
								value={passwordAgain}
								onChange={handleChangePasswordAgain}
							/>
							<div
								className='resetPass__field--icon resetPass__field--icon-eye'
								onClick={handleClickShowPassword}>
								{!passwordShow ? <EyeSlashIcon /> : <EyeIcon />}
							</div>
						</div>
						{checkPasswordAgain && (
							<p className='resetPass__field--noteErr normal-regular'>
								{messErr.passwordAgainErr}
							</p>
						)}
					</div>
					<Button
						className={'resetPass__submit'}
						children={'Xác nhận'}
						onClick={submit}
					/>
				</div>
			</div>
			<Toast />
		</Background>
	)
}

export default ResetPassowrdPage
