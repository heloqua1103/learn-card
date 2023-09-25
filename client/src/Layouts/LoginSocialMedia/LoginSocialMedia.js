import React from 'react'
import { GoogleIcon, FacebookIcon } from '~/assets/Icons'
import { Button } from '~/Components/components'
import './LoginSocialMedia.scss'

function LoginSocialMedia() {
	return (
		<div className='social'>
			<Button
				icon={<GoogleIcon />}
				children='Google'
				className='social--google'
			/>
			<Button
				icon={<FacebookIcon />}
				children='Facebook'
				className='social--facebook'
			/>
		</div>
	)
}

export default LoginSocialMedia
