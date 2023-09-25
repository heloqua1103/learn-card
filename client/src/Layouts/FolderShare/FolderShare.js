import React, { useState, Fragment } from 'react'
import { EmptyFolder } from '~/Components/components'
import './FolderShare.scss'

function FolderShare({ data }) {
	const [study, setStudy] = useState(true)
	const [friend, setFriend] = useState(false)

	const handleActiveStudy = () => {
		setStudy(true)
		setFriend(false)
	}

	const handleActiveFriend = () => {
		setStudy(false)
		setFriend(true)
	}

	return (
		<div className='folderShare'>
			<div className='folderShare__nav'>
				<h2
					className={study ? 'folderShare__nav--active' : ''}
					onClick={handleActiveStudy}>
					Học tập
				</h2>
				<h2
					className={friend ? 'folderShare__nav--active' : ''}
					onClick={handleActiveFriend}>
					Bạn bè <span>(0)</span>
				</h2>
			</div>
			<div className='folderShare__content'>
				{study ? (
					<Fragment>
						<div className='folderShare__folder'>
							<h2 className='folderShare__folder--title'>
								Thư mục đã chia sẻ{' '}
								<span className='folderShare__folder--quanlity'>(0)</span>
							</h2>
							<div className='folderShare__folder--list'>
								{data ? 'data' : <EmptyFolder />}
							</div>
						</div>
						<div className='folderShare__folderCollaborate'>
							<h2 className='folderShare__folderCollaborate--title'>
								Thư mục cộng tác với bạn{' '}
								<span className='folderShare__folderCollaborate--quanlity'>
									(0)
								</span>
							</h2>
							<div className='folderShare__folderCollaborate--list'>
								{data ? 'data' : <EmptyFolder />}
							</div>
						</div>
					</Fragment>
				) : (
					<EmptyFolder />
				)}
			</div>
		</div>
		// <div className='infor__main--top'>
		// 	<div className='infor__main--top-nav'>
		// 		<h2 className='infor__main--top-nav__active'>Học tập</h2>
		// 		<h2>
		// 			Bạn bè <span>(0)</span>
		// 		</h2>
		// 	</div>
		// 	<div className='infor__main--top-main'>
		// 		<div className='infor__main--top-folder'>
		// 			<h2>
		// 				Thư mục đã chia sẻ <span>(0)</span>
		// 			</h2>
		// 			<div className='infor__main--top-folder__list'>
		// 				<EmptyFolder />
		// 			</div>
		// 		</div>
		// 		<div className='infor__main--top-folderCollaborate'>
		// 			<h2>
		// 				Thư mục cộng tác với bạn <span>(0)</span>
		// 			</h2>
		// 			<div className='infor__main--top-folderCollaborate__list'>
		// 				<EmptyFolder />
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	)
}

export default FolderShare
