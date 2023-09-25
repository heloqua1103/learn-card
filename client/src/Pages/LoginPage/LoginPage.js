/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import joi from 'joi'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Toast } from '~/Components/components'
import { UserIcon, EyeIcon, EyeSlashIcon } from '~/assets/Icons'
import { Background, LoginSocialMedia } from '~/Layouts/Layout'
import { emailJoi } from '~/helpers/joi_validator'
import './Loginpage.scss'

function LoginPage() {
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [passwordShow, setPasswordShow] = useState(false)
	const [checkEmail, setCheckEmail] = useState(false)
	const [checkPassword, setCheckPassword] = useState(false)
	const [messErr, setMessErr] = useState({
		emailErr: '',
		passwordErr: '',
	})
	const navigate = useNavigate()

	const handleChangePassword = e => {
		const value = e.target.value

		if (!value.startsWith(' ')) {
			setPassword(value)
			setCheckPassword(false)
		} else {
			setCheckPassword(true)
			setMessErr({ ...messErr, passwordErr: 'không thể bắt đầu bằng dấu " "!' })
		}
	}

	const handleChangeEmail = e => {
		const value = e.target.value

		const { error } = joi.object({ emailJoi }).validate({ emailJoi: value })

		if (value.startsWith(' ')) {
			setCheckEmail(true)
			setMessErr({ ...messErr, emailErr: 'không thể bắt đầu bằng dấu " "!' })
		} else if (error) {
			setEmail(value)
			setCheckEmail(true)
			setMessErr({ ...messErr, emailErr: 'Vui lòng nhập email!' })
		} else {
			setEmail(value)
			setCheckEmail(false)
		}
	}

	const handleClickShowPassword = () => {
		setPasswordShow(!passwordShow)
	}

	const submit = () => {
		var urlencoded = new URLSearchParams()
		urlencoded.append('email', email)
		urlencoded.append('password', password)

		fetch('http://localhost:8000/api/user/login', {
			method: 'POST',
			body: urlencoded,
			redirect: 'follow',
		})
			.then(response => response.json())
			.then(result => {
				if (result?.success) {
					localStorage.setItem('auth', JSON.stringify(result))
					toast.success('Đăng nhập thành công vui lòng đợi đến trang chủ')
					setTimeout(() => {
						navigate('/home')
					}, 3000)
				} else {
					switch (result?.mess) {
						case 'Missing inputs':
							toast.error('Vui lòng nhập thông tin!')
							break
						case 'Invalid credentials!':
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
			<div className='login'>
				<h1 className='login__title'>Đăng Nhập</h1>
				<LoginSocialMedia />
				<span className='large-semibold'>hoặc</span>
				<div className='login__form'>
					<div className='login__field'>
						<div
							className={
								checkEmail
									? 'login__field--item login__field--err'
									: 'login__field--item'
							}>
							<div className='login__field--icon'>
								<UserIcon />
							</div>
							<input
								className='login__field--input normal-regular'
								type='text'
								placeholder='Tên đăng nhập hoặc Email'
								value={email}
								onChange={handleChangeEmail}
							/>
						</div>
						{checkEmail && (
							<p className='login__field--noteErr normal-regular'>
								{messErr.emailErr}
							</p>
						)}
					</div>
					<div className='login__field'>
						<div
							className={
								checkPassword
									? 'login__field--item login__field--err'
									: 'login__field--item'
							}>
							<div className='login__field--icon'>
								<UserIcon />
							</div>
							<input
								className='login__field--input normal-regular'
								type={!passwordShow ? 'password' : 'text'}
								placeholder='Mật Khẩu'
								value={password}
								onChange={handleChangePassword}
							/>
							<div
								className='login__field--icon login__field--icon-eye'
								onClick={handleClickShowPassword}>
								{!passwordShow ? <EyeSlashIcon /> : <EyeIcon />}
							</div>
						</div>
						{checkPassword && (
							<p className='login__field--noteErr normal-regular'>
								{messErr.passwordErr}
							</p>
						)}
					</div>
					<div className='login__forgot'>
						<Link
							className='login__forgot--link normal-medium'
							to={'/forgot-password'}>
							Quên mật khẩu
						</Link>
					</div>
					<Button
						onClick={submit}
						className='login__submit'
						children='Đăng Nhập'
					/>
				</div>
				<p className='login__signup large-regular'>
					Bạn chưa có tài khoản? <Link to={'/register'}>Đăng Ký</Link>
				</p>
			</div>
			<Toast />
		</Background>
	)
}

export default LoginPage
