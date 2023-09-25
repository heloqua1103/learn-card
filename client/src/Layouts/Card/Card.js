import './Card.scss'
import { Button, Toast } from '../../Components/components'
import Popup from 'reactjs-popup'
import {
	AiOutlineFolderAdd,
	AiOutlineDelete,
	AiOutlineEdit,
} from 'react-icons/ai'
import { BsVolumeUp } from 'react-icons/bs'
import { toast } from 'react-toastify'

function Card({ data }) {
	const wordList = data || []
	const token = JSON.parse(localStorage.getItem('auth')).accessToken

	const handleDelete = async (token, close, e) => {
		let data = e.target.dataset.id

		let myHeaders = new Headers()
		myHeaders.append('Authorization', `Bearer ${token}`)
		myHeaders.append('Content-Type', 'application/json')

		var raw = JSON.stringify({
			type: 'remove-card',
			data: {
				_id: data,
			},
		})

		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		}

		fetch('http://localhost:8000/api/listCard', requestOptions)
			.then(response => response.json())
			.then(result => {
				if (result?.success) {
					toast.success('Xóa thẻ thành công!!')
					close()
				}
			})
			.catch(error => console.log('error', error))
	}

	return wordList.map((word, index) => {
		return (
			<div key={index} className='card__item'>
				<div className='card__item--inner'>
					<p className='card__item--front large-semibold'>{word.text}</p>
					<p className='card__item--back large-semibold'>
						{word.translateText}
					</p>
				</div>
				<div className='detail__content'>
					<div className='detail__content--top'>
						<div className='detail__content--left'>
							<Button className='detail__content--difficult'>Từ khó</Button>
						</div>
						<div className='detail__content--right'>
							<Button
								icon={<AiOutlineFolderAdd />}
								className='detail__content--action'
							/>
							<Popup
								trigger={
									<Button
										icon={<AiOutlineDelete />}
										className='detail__content--action'
									/>
								}
								modal
								nested>
								{close => (
									<div className='modal'>
										<div className='modal__header'> Xác nhận </div>
										<div className='modal__content'>
											bạn có muốn chắc chắn xóa từ nay không?
										</div>
										<div className='modal__btn'>
											<Button
												onClick={close}
												className={'modal__btn--cancel'}
												children={'Hủy'}
											/>
											<Button
												data-id={word._id}
												onClick={e => handleDelete(token, close, e)}
												className={'modal__btn--delete'}
												children={'Đồng ý'}
											/>
										</div>
									</div>
								)}
							</Popup>
							<Button
								icon={<AiOutlineEdit />}
								className='detail__content--action'
							/>
							<Button
								icon={<BsVolumeUp />}
								className='detail__content--action'
							/>
						</div>
					</div>
					<p className='detail__content--day normal-regular'>
						{word.createdAt.slice(0, 10)}
					</p>
				</div>
				<Toast position={'top-center'} />
			</div>
		)
	})
}

export default Card
