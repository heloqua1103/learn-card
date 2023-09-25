import React from 'react'
import CreateBlog from '~/Components/CreateBlog/CreateBlog'
import images from '~/assets/Images/index'
import { Comment } from '../Layout'
import './BlogUser.scss'

const datas = [
	{
		id: '0',
		name: 'abc',
		image: images.avatarDefault,
		blogs: [
			{
				idBlog: '0',
				content: 'gkdlgjldjsgjdlsjgljsdgjlsdgjldjsgljsdlgjlsjglsdjgkjlkj',
				timePost: '28/03/2023 - 13:01:52s PM',
				comments: [
					{
						id: '1',
						name: 'Hoang23123',
						image: images.avatarDefault,
						timeComment: '28/03/2023 - 15:01:52s PM',
						contentComment: ';sdlhkrkehkpwjuroigjoiwjgfowkjefklwjlfkjlew',
					},
					{
						id: '2',
						name: 'Hoang11',
						image: images.avatarDefault,
						timeComment: '28/03/2023 - 18:01:52s PM',
						contentComment: ';sdlhkrkdfhwkjefklwjlfkjlew',
					},
					{
						id: '3',
						name: 'Hoang9898',
						image: images.avatarDefault,
						timeComment: '28/03/2023 - 19:01:52s PM',
						contentComment: ';sdlhkrkehkpwlyuilyuyuyuiyo',
					},
				],
			},
			{
				idBlog: '1',
				content: 'gkdlgjldjsgjdlsjgljsdgjlsdgjldjsgljsdlgjlsjglsdjgkjlkj',
				timePost: '29/03/2023 - 15:01:52s PM',
				comments: [{
					id: '3',
					name: 'Hoang9898',
					image: images.avatarDefault,
					timeComment: '28/03/2023 - 19:01:52s PM',
					contentComment: ';sdlhkrkehkpwlyuilyuyuyuiyo',
				},],
			},
			{
				idBlog: '2',
				content: 'gkdlgjldjsgjdlsjgljsdlgjlsjglsdjgkjlkj',
				timePost: '29/03/2023 - 17:01:52s PM',
				comments: [
					{
						id: '3',
						name: 'Hoang1',
						image: images.avatarDefault,
						timeComment: '28/03/2023 - 19:02:52s PM',
						contentComment: ';sdlhkrkehkpwlyuilyuyuyuiyo',
					},
				],
			},
			{
				idBlog: '0',
				content: 'gkdlgjldjsgjdlsjgljsdgjlsdgjldjsgljsdlgjlsjglsdjgkjlkj',
				timePost: '28/03/2023 - 13:01:52s PM',
				comments: [
					{
						id: '1',
						name: 'Hoang23123',
						image: images.avatarDefault,
						timeComment: '28/03/2023 - 15:01:52s PM',
						contentComment: ';sdlhkrkehkpwjuroigjoiwjgfowkjefklwjlfkjlew',
					},
					{
						id: '2',
						name: 'Hoang11',
						image: images.avatarDefault,
						timeComment: '28/03/2023 - 18:01:52s PM',
						contentComment: ';sdlhkrkdfhwkjefklwjlfkjlew',
					},
					{
						id: '3',
						name: 'Hoang9898',
						image: images.avatarDefault,
						timeComment: '28/03/2023 - 19:01:52s PM',
						contentComment: ';sdlhkrkehkpwlyuilyuyuyuiyo',
					},
				],
			},
		],
	},
]

function BlogUser() {
	return (
		<div className='blog'>
			<div className='blog__header'>
				<h1 className='blog__header--title'>Bài viết</h1>
				<p className='small-semibold'>
					Tổng bài viết:{' '}
					<span className='blog__header--quantity'>
						{datas[0].blogs.reduce(accumulator => {
							return (accumulator += 1)
						}, 0)}
					</span>
				</p>
			</div>
			<p className='normal-regular'>
				Đặt câu bằng những từ vựng mới để ôn lại kiến thức. Hoặc lưu lại câu nói
				yêu thích trong ngày của bạn tại đây.
			</p>
			<CreateBlog />
			<Comment datas={datas} />
		</div>
	)
}

export default BlogUser
