import './Modal.scss'

import { Button, EmptyFolder, Toast } from '~/Components/components'

import { TfiPlus } from 'react-icons/tfi'
import { useEffect, useState } from 'react'
import { CheckIcon } from '~/assets/Icons'
import { toast } from 'react-toastify'

function Modal({ onClick }) {
	const [text, setText] = useState([])
	const [listText, setListText] = useState([])
	const [defineText, setDefineText] = useState('')
	const [textInput, setTextInput] = useState('')
	const [checkState, setCheckState] = useState(false)

	const token = JSON.parse(localStorage.getItem('auth')).accessToken

	const getTextInput = e => {
		const value = e.target.value
		setTextInput(value)
	}

	const handleAddTex = e => {
		if (!listText.find(value => value === e.target.dataset.translate)) {
			setListText([...listText, e.target.dataset.translate])
			setCheckState(!checkState)
		} else {
			listText.pop(e.target.dataset.translate)
			setListText([...listText])
			setCheckState(!checkState)
		}
	}

	const handleDefineText = e => {
		const value = e.target.value

		if (!value.startsWith(' ')) {
			setDefineText(value)
		}
	}

	const handleCancel = () => {
		setListText([])
		setDefineText('')
		onClick()
	}

	const handleAdd = async token => {
		let myHeaders = new Headers()
		myHeaders.append('Authorization', `Bearer ${token}`)
		myHeaders.append('Content-Type', 'application/json')

		var raw = JSON.stringify({
			type: 'create-card',
			data: {
				text: textInput,
				translateText:
					(defineText === '' ? defineText : defineText + ', ') +
					listText.join(','),
				typeDifficult: false,
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
					toast.success('Đã tạo card thành công!!!')
					setListText([])
					setDefineText('')
				} else {
					toast.error('Vui lòng điền thông tin!!!')
				}
			})
			.catch(error => console.log('error', error))
	}

	useEffect(() => {
		async function createText(textInput) {
			const requestUrl = `https://api.mymemory.translated.net/get?q=${textInput}&langpair=en|vi`
			const response = await fetch(requestUrl)
			const responseJSON = await response.json()
			setText(responseJSON)
		}

		createText(textInput)
	}, [textInput])

	return (
		<div className='modal__body'>
			<div className='modal__body--left'>
				<div className='modal__body--input'>
					<input
						type='text'
						className='modal__body--control'
						placeholder='Nhập từ mới'
						onChange={getTextInput}
						value={textInput}
					/>
				</div>
				<h2>Định nghĩa</h2>
				<div className='modal__body--textarea'>
					<textarea
						className='modal__body--text normal-regular'
						placeholder='Nhập định nghĩa'
						value={defineText}
						onChange={handleDefineText}
					/>
					<div className='modal__body--listText'>
						{listText.map((e, index) => {
							return (
								<div
									key={index}
									className='modal__body--textItem normal-regular'>
									{e}
								</div>
							)
						})}
					</div>
				</div>
				<div className='modal__body--btn'>
					<Button
						onClick={handleCancel}
						className={'modal__body--btn-cancel'}
						children={'Hủy'}
					/>
					<Button
						onClick={() => handleAdd(token)}
						className={'modal__body--btn-add'}
						children={'Thêm'}
					/>
				</div>
			</div>
			<div className='modal__body--right'>
				<h2>Từ điển</h2>
				<div>
					<div className='modal__body--tablist'>
						<span className='large-semibold'>Tiếng Việt</span>
					</div>
					<div className='modal__body--translate'>
						<div className='modal__body--translate'>
							{text.matches ? (
								text.matches.map((e, index) => {
									return (
										<Button
											key={index}
											icon={
												listText.find(value => value === e.translation) ===
												e.translation ? (
													<CheckIcon />
												) : (
													<TfiPlus />
												)
											}
											className={
												listText.find(value => value === e.translation) ===
												e.translation
													? 'modal__body--translate-word modal__body--translate-word--active'
													: 'modal__body--translate-word'
											}
											children={e.translation}
											data-translate={e.translation}
											onClick={handleAddTex}
										/>
									)
								})
							) : (
								<EmptyFolder children='Nhập từ mới để xem dữ liệu bạn nhé!' />
							)}
						</div>
					</div>
				</div>
			</div>
			<Toast position={'top-center'} />
		</div>
	)
}

export default Modal
