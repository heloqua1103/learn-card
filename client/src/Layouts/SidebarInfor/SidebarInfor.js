import React from 'react'
import { Button, EmptyFolder } from '~/Components/components'
import images from '~/assets/Images'
import './SidebarInfor.scss'

function SidebarInfor({ data }) {
	const { name, email, image } = data

	return (
		<div className='sidebar__infor'>
			<div className='sidebar__infor--header'>
				<img
					className='sidebar__infor--header__img'
					src={image ? image : images.avatarDefault}
					alt=''
				/>
				<div className='sidebar__infor--right'>
					<h2 className='sidebar__infor--name'>{name}</h2>
					<div className='sidebar__infor--email small-medium'>{email}</div>
					<div className='sidebar__infor--level normal-medium'>
						Cấp 1 Thành viên
					</div>
				</div>
			</div>
			<div className='sidebar__infor--edit'>
				<EmptyFolder children='Thông tin trang cá nhân của bạn đang trống.' />
				<Button
					className={'sidebar__infor--edit-btn'}
					children={'Chỉnh sửa'}
					to={'/profile'}
				/>
			</div>
			<div className='sidebar__infor--other'>
				<p className='normal-semibold'>
					Ngày sinh: <span className='normal-medium'>(Trống)</span>
				</p>
				<p className='normal-semibold'>
					Cung: <span className='normal-medium'>(Trống)</span>
				</p>
				<p className='normal-semibold'>
					Giới Tính: <span className='normal-medium'>(Trống)</span>
				</p>
				<p className='normal-semibold'>
					Nơi sinh sống: <span className='normal-medium'>(Trống)</span>
				</p>
				<p className='normal-semibold'>
					Nghề nghiệp: <span className='normal-medium'>(Trống)</span>
				</p>
				<p className='normal-semibold'>
					Sở thích: <span className='normal-medium'>(Trống)</span>
				</p>
				<p className='normal-semibold'>
					Ngôn ngữ yêu thích: <span className='normal-medium'>(Trống)</span>
				</p>
				<p className='normal-semibold'>
					Câu nói yêu thích: <span className='normal-medium'>(Trống)</span>
				</p>
			</div>
		</div>
	)
}

export default SidebarInfor
