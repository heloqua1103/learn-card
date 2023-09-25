import React from 'react'
import images from '~/assets/Images/index'
import { Button } from '~/Components/components'
import './Comment.scss'

const Friend = [
	{
		id: '0',
		name: 'abc',
		image: 'images.avatarDefault',
	},
]

function Comment({ datas }) {
	return (
		<div className='comment'>
			{datas[0].blogs.map((data, index) => {
				return (
					<div key={index} className='comment__item' data-id={data.idBlog}>
						<div className='comment__item--header'>
							<img
								className='comment__item--img'
								src={datas[0].image ? datas[0].image : images.avatarDefault}
								alt='Avatar User'
							/>
							<div className='comment__item--infoMain'>
								<p className='comment__item--infoMain__name normal-semibold'>
									{datas[0].name}
								</p>
								<p className='comment__item--infoMain__time small-medium'>
									{data.timePost}
								</p>
							</div>
						</div>
						<p className='comment__content normal-regular'>{data.content}</p>
						<div className='comment__feedback'>
							<p className='large-regular'>
								<span>
									{data.comments.reduce(accumulator => {
										return (accumulator += 1)
									}, 0)}
								</span>{' '}
								Bình luận
							</p>
							{data.comments.map((comment, index) => {
								return (
									<div
										key={index}
										className='comment__feedback--item'
										data-id={data.id}>
										<div className='comment__feedback--header'>
											<img
												className='comment__feedback--img'
												src={
													comment.image ? comment.image : images.avatarDefault
												}
												alt='Avatar User'
											/>
											<div className='comment__feedback--infoMain'>
												<p className='comment__feedback--infoMain__name normal-semibold'>
													{comment.name}
												</p>
												<p className='comment__feedback--infoMain__time small-medium'>
													{comment.timeComment}
												</p>
											</div>
										</div>
										<p className='comment__feedback--content normal-regular'>
											{comment.contentComment}
										</p>
									</div>
								)
							})}
						</div>

						<div className='comment__create'>
							<img
								src={!Friend.image ? images.avatarDefault : Friend.image}
								alt='Avatar User'
								className='comment__create--img'
							/>
							<input
								className='comment__create--input normal-regular'
								type='text'
								placeholder='Bạn muốn chia sẻ điều gì'
							/>
							<Button
								className={'comment__create--btn'}
								children={'Bình luận'}
								data-id={Friend.id || datas[0].id}
								data-blog={data.idBlog}
							/>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default Comment
