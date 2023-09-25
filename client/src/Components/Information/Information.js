import './Information.scss'
import { Link } from 'react-router-dom'

import { TfiAngleDown } from 'react-icons/tfi'
import images from '~/assets/Images/'

function Information({ data }) {
	const { _id, name, email, image } = data

	return (
		<div className='inforItem'>
			<div className='inforItem__header'>
				<img
					className='inforItem__header--img'
					src={image ? image : images.avatarDefault}
					alt='Avatar user'
				/>
				<span className='inforItem__header--name large-regular'>{name}</span>
				<div className='inforItem__header--icon'>
					<TfiAngleDown className='inforItem__header--icon-down' />
				</div>
			</div>
			<ul className='inforItem__dropdown'>
				<li>
					<span className='large-semibold'>{name}</span>
				</li>
				<li>
					<span className='small-medium'>{email}</span>
				</li>
				<li>
					<Link className='normal-regular' to={'/home'}>
						Trang chủ
					</Link>
				</li>
				<li>
					<Link className='normal-regular' to={`/user-profile/${_id}`}>
						Trang cá nhân
					</Link>
				</li>
				<li>
					<Link className='normal-regular' to={'/login'}>
						Đăng xuất
					</Link>
				</li>
			</ul>
		</div>
	)
}

export default Information
