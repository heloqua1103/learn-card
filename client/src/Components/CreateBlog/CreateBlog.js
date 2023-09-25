import React from 'react'
import images from '~/assets/Images/index'
import './CreateBlog.scss'

function CreateBlog({ className, imgURL }) {
	return (
		<div className={!className ? 'createBlog' : `createBlog ${className}`}>
			<img
				className='createBlog__img'
				src={!imgURL ? images.avatarDefault : imgURL}
				alt='Avatar User'
			/>
			<input
				className='createBlog__input normal-regular'
				type='text'
				placeholder='Bạn muốn chia sẻ điều gì'
			/>
		</div>
	)
}

export default CreateBlog
