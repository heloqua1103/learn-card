import React from 'react'
import { Button } from '~/Components/components'
import './PersonalInformation.scss'

function PersonalInformation() {
	return (
		<div className='personalInfor'>
			<div className='personalInfor__form'>
				<div className='personalInfor__left'>
					<div className='personalInfor__field'>
						<label
							className='personalInfor__field--label normal-semibold'
							htmlFor='name'>
							Tên
						</label>
						<input
							className='personalInfor__field--input normal-regular'
							id='name'
							type='text'
							placeholder='Nhập tên'
						/>
					</div>
					<div className='personalInfor__field'>
						<label
							className='personalInfor__field--label normal-semibold'
							htmlFor='lastName'>
							Họ
						</label>
						<input
							className='personalInfor__field--input normal-regular'
							id='lastName'
							type='text'
							placeholder='Nhập họ'
						/>
					</div>
					<div className='personalInfor__field'>
						<label
							className='personalInfor__field--label normal-semibold'
							htmlFor='phoneNumber'>
							Số điện thoại
						</label>
						<input
							className='personalInfor__field--input normal-regular'
							id='phoneNumber'
							type='number'
							placeholder='Nhập số điện thoại'
						/>
					</div>
					<div className='personalInfor__field'>
						<label
							className='personalInfor__field--label normal-semibold'
							htmlFor='gender'>
							Giới tính
						</label>
						<div className='personalInfor__field--select'>
							<input
								className='personalInfor__field--select__input normal-regular'
								id='gender'
								type='text'
							/>
						</div>
					</div>
					<div className='personalInfor__field'>
						<label
							className='personalInfor__field--label normal-semibold'
							htmlFor='date'>
							Ngày sinh
						</label>
						<input
							className='personalInfor__field--input normal-regular'
							id='date'
							type='date'
						/>
					</div>
					<div className='personalInfor__field'>
						<label
							className='personalInfor__field--label normal-semibold'
							htmlFor='live'>
							Nơi sinh sống
						</label>
						<div className='personalInfor__field--select'>
							<input
								className='personalInfor__field--select__input normal-regular'
								id='live'
								type='text'
							/>
						</div>
					</div>
				</div>
				<div className='personalInfor__right'>
					<div className='personalInfor__field'>
						<label
							className='personalInfor__field--label normal-semibold'
							htmlFor='job'>
							Nghề nghiệp
						</label>
						<input
							className='personalInfor__field--input normal-regular'
							id='job'
							type='text'
						/>
					</div>
					<div className='personalInfor__field'>
						<label
							className='personalInfor__field--label normal-semibold'
							htmlFor='loveLang'>
							Ngôn ngữ yêu thích
						</label>
						<textarea
							className='personalInfor__field--textarea normal-regular'
							id='loveLang'
							type='text'
						/>
					</div>
					<div className='personalInfor__field'>
						<label
							className='personalInfor__field--label normal-semibold'
							htmlFor='favorite'>
							Sở Thích
						</label>
						<textarea
							className='personalInfor__field--textarea normal-regular'
							id='favorite'
							type='text'
						/>
					</div>
					<div className='personalInfor__field'>
						<label
							className='personalInfor__field--label normal-semibold'
							htmlFor='loveSay'>
							Câu nói yêu thích
						</label>
						<textarea
							className='personalInfor__field--textarea normal-regular'
							id='loveSay'
							type='text'
						/>
					</div>
					<div className='personalInfor__field'>
						<label
							className='personalInfor__field--label normal-semibold'
							htmlFor='intro'>
							Giới thiệu bản thân
						</label>
						<textarea
							className='personalInfor__field--textarea normal-regular'
							id='intro'
							type='text'
						/>
					</div>
				</div>
			</div>
			<Button className={'personalInfor__submit'} children={'Lưu'} />
		</div>
	)
}

export default PersonalInformation
