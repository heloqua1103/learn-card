import React, { useState } from 'react'
import joi from 'joi'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Toast } from '~/Components/components'
import { UserIcon, EyeIcon, EyeSlashIcon } from '~/assets/Icons'
import { Background, LoginSocialMedia } from '~/Layouts/Layout'
import {
	emailJoi,
	passwordJoi,
	nameJoi,
	phoneJoi,
} from '~/helpers/joi_validator'
import './RegisterPage.scss'

function LoginPage() {
	const [password, setPassword] = useState('')
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [passwordAgain, setpasswordAgain] = useState('')
	const [passwordShow, setPasswordShow] = useState(false)
	const [checkEmail, setCheckEmail] = useState(false)
	const [checkPassword, setCheckPassword] = useState(false)
	const [checkPasswordAgain, setCheckPasswordAgain] = useState(false)
	const [checkPhone, setCheckPhone] = useState(false)
	const [checkName, setCheckName] = useState(false)
	const [messErr, setMessErr] = useState({
		emailErr: '',
		passwordErr: '',
		passwordAgainErr: '',
		nameErr: '',
		phoneErr: '',
	})

	const navigate = useNavigate()

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

	const handleChangeName = e => {
		const value = e.target.value

		const { error } = joi.object({ nameJoi }).validate({ nameJoi: value })

		if (value.startsWith(' ')) {
			setCheckName(true)
			setMessErr({ ...messErr, nameErr: 'không thể bắt đầu bằng dấu " "!' })
		} else if (error) {
			setName(value)
			setCheckName(true)
			setMessErr({
				...messErr,
				nameErr: 'Vui lòng nhập tên ( không dưới 3 ký tự và trên 30 ký tự )!',
			})
		} else {
			setCheckName(false)
			setName(value)
		}
	}

	const handleChangePhone = e => {
		const value = e.target.value

		const { error } = joi.object({ phoneJoi }).validate({ phoneJoi: value })

		if (error) {
			setPhone(value)
			setCheckPhone(true)
			setMessErr({
				...messErr,
				phoneErr: 'Vui lòng nhập số điện thoại',
			})
		} else {
			setCheckPhone(false)
			setPhone(value)
		}
	}

	const handleClickShowPassword = () => {
		setPasswordShow(!passwordShow)
	}

	const submit = () => {
		if (password === passwordAgain) {
			let raw = JSON.stringify({
				email: email,
				password: password,
				name: name,
				phone: phone,
			})

			fetch('http://localhost:8000/api/user/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: raw,
				redirect: 'follow',
			})
				.then(response => response.json())
				.then(result => {
					if (result?.success) {
						toast.success('Đăng ký thành công vui lòng đợi đến đăng nhập')
						setTimeout(() => {
							navigate('/login')
						}, 3000)
					} else {
						switch (result?.mess) {
							case 'Missing inputs':
								toast.error('Vui lòng nhập thông tin!')
								break
							case 'User has existed':
								toast.error('Email này đã được sử dụng')
								break
							case 'Something went wrong':
								toast.error(
									'Đã xảy ra sự cố. Vui lòng kiểm tra lại đường truyền mạng!',
								)
								break
							case `user validation failed: email: Validator failed for path \`email\` with value \`${email}\``:
								toast.error(messErr.emailErr)
								break
							case `user validation failed: name: Path \`name\` (\`${name}\`) is shorter than the minimum allowed length (3).`:
								toast.error(messErr.nameErr)
								break
							case `user validation failed: name: Path \`name\` (\`${name}\`) is longer than the maximum allowed length (30).`:
								toast.error(messErr.nameErr)
								break
							case `user validation failed: phone: Path \`phone\` (\`${phone}\`) is shorter than the minimum allowed length (6).`:
								toast.error(messErr.phoneErr)
								break
							default:
								toast.error('Không thể kết nối máy chủ!!!')
						}
					}
				})
				.catch(error => console.log('error', error))
		}
	}

	return (
		<Background className={'register__backgournd'}>
			<div className='register'>
				<h1 className='register__title'>Đăng Ký</h1>
				<LoginSocialMedia />
				<span className='large-semibold'>hoặc</span>
				<div className='register__form'>
					<div className='register__field'>
						<div
							className={
								checkName
									? 'register__field--item register__field--err'
									: 'register__field--item'
							}>
							<div className='register__field--icon'>
								<UserIcon />
							</div>
							<input
								className='register__field--input normal-regular'
								type='text'
								placeholder='Nhập tên của bạn'
								value={name}
								onChange={handleChangeName}
							/>
						</div>
						{checkName && (
							<p className='register__field--noteErr normal-regular'>
								{messErr.nameErr}
							</p>
						)}
					</div>
					<div className='register__field'>
						<div
							className={
								checkEmail
									? 'register__field--item register__field--err'
									: 'register__field--item'
							}>
							<div className='register__field--icon'>
								<UserIcon />
							</div>
							<input
								className='register__field--input normal-regular'
								type='text'
								placeholder='Tên đăng nhập hoặc Email'
								value={email}
								onChange={handleChangeEmail}
							/>
						</div>
						{checkEmail && (
							<p className='register__field--noteErr normal-regular'>
								{messErr.emailErr}
							</p>
						)}
					</div>
					<div className='register__field'>
						<div
							className={
								checkPassword
									? 'register__field--item register__field--err'
									: 'register__field--item'
							}>
							<div className='register__field--icon'>
								<UserIcon />
							</div>
							<input
								className='register__field--input normal-regular'
								type={!passwordShow ? 'password' : 'text'}
								placeholder='Mật Khẩu'
								value={password}
								onChange={handleChangePassword}
								autoComplete='on'
							/>
							<div
								className='login__field--icon login__field--icon-eye'
								onClick={handleClickShowPassword}>
								{!passwordShow ? <EyeSlashIcon /> : <EyeIcon />}
							</div>
						</div>
						{checkPassword && (
							<p className='register__field--noteErr normal-regular'>
								{messErr.passwordErr}
							</p>
						)}
					</div>
					<div className='register__field'>
						<div
							className={
								checkPasswordAgain
									? 'register__field--item register__field--err'
									: 'register__field--item'
							}>
							<div className='register__field--icon'>
								<UserIcon />
							</div>
							<input
								className='register__field--input normal-regular'
								type={!passwordShow ? 'password' : 'text'}
								placeholder='Nhập lại mật Khẩu'
								value={passwordAgain}
								onChange={handleChangePasswordAgain}
								autoComplete='on'
							/>
							<div
								className='login__field--icon login__field--icon-eye'
								onClick={handleClickShowPassword}>
								{!passwordShow ? <EyeSlashIcon /> : <EyeIcon />}
							</div>
						</div>
						{checkPasswordAgain && (
							<p className='register__field--noteErr normal-regular'>
								{messErr.passwordAgainErr}
							</p>
						)}
					</div>
					<div className='register__field'>
						<div
							className={
								checkPhone
									? 'register__field--item register__field--err'
									: 'register__field--item'
							}>
							<div className='register__field--icon'>
								<UserIcon />
							</div>
							<input
								className='register__field--input normal-regular'
								type='number'
								placeholder='Nhập số điện thoại'
								value={phone}
								onChange={handleChangePhone}
							/>
						</div>
						{checkPhone && (
							<p className='register__field--noteErr normal-regular'>
								{messErr.phoneErr}
							</p>
						)}
					</div>
					<Button
						className='register__submit'
						children='Đăng Ký'
						onClick={submit}
					/>
				</div>
				<p className='register__signup large-regular'>
					Bạn có sẵn tài khoản? <Link to={'/login'}>Đăng Nhập</Link>
				</p>
			</div>
			<Toast />
		</Background>
	)
}

export default LoginPage
