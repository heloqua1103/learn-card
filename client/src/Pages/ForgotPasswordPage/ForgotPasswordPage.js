import React, { useState } from 'react'
import joi from 'joi'
import { toast } from 'react-toastify'
import { Background } from '~/Layouts/Layout'
import { Button, BackHome, Toast } from '~/Components/components'
import { emailJoi } from '~/helpers/joi_validator'
import './ForgotPasswordPage.scss'

function ForgotPasswordPage() {
	const [email, setEmail] = useState('')
	const [checkEmail, setCheckEmail] = useState(false)
	const [messErr, setMessErr] = useState('')

	const handleChangeEmail = e => {
		const value = e.target.value

		const { error } = joi.object({ emailJoi }).validate({ emailJoi: value })

		if (value.startsWith(' ')) {
			setCheckEmail(true)
			setMessErr('không thể bắt đầu bằng dấu " "!')
		} else if (error) {
			setEmail(value)
			setCheckEmail(true)
			setMessErr('Vui lòng nhập email!')
		} else {
			setEmail(value)
			setCheckEmail(false)
		}
	}

	const submit = () => {
		fetch(`http://localhost:8000/api/user/forgotpassword?email=${email}`, {
			method: 'GET',
			redirect: 'follow',
		})
			.then(response => response.json())
			.then(result => {
				if (result?.success) {
					toast.success('Gửi gmail thành công')
				} else {
					switch (result?.mess) {
						case 'Missing email':
							toast.error('Vui lòng nhập email!')
							break
						case 'User not found':
							toast.error('Không tìm thấy tài khoản!')
							break
						default:
							toast.error('Không thể kết nối máy chủ!!!')
					}
				}
			})
			.catch(error => console.log('error', error))
	}

	return (
		<Background>
			<BackHome children={'Đăng nhập'} to={'/login'} />
			<div className='forgotPass'>
				<h1 className='forgotPass__title'>Quên Mật Khẩu</h1>
				<div className='forgotPass__form'>
					<div className='forgotPass__field'>
						<div
							className={
								checkEmail
									? 'forgotPass__field--item forgotPass__field--err'
									: 'forgotPass__field--item'
							}>
							<input
								className='forgotPass__field--input normal-regular'
								type='text'
								placeholder='Nhập email của bạn'
								value={email}
								onChange={handleChangeEmail}
							/>
						</div>
						{checkEmail && (
							<p className='forgotPass__field--noteErr normal-regular'>
								{messErr}
							</p>
						)}
					</div>
					<Button
						className={'forgotPass__submit'}
						children={'Gửi gmail'}
						onClick={submit}
					/>
				</div>
			</div>
			<Toast />
		</Background>
	)
}

export default ForgotPasswordPage
