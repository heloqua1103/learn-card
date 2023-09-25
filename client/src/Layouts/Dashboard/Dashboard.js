import './Dashboard.scss'
import { Button } from '~/Components/components'

import { TfiReload, TfiSearch, TfiArrowRight, TfiClose } from 'react-icons/tfi'

function Dashboard({ data }) {
	const wordList = data || []
	return (
		<div className='dashboard'>
			<div className='dashboard__top'>
				<div className='dashboard__action'>
					<div className='dashboard__action--total'>
						Tổng cộng:
						<span>{wordList ? wordList.length : 0}</span>
					</div>
					<div className='dashboard__action--folder'>
						Thư Mục Hiện Tại:
						<span>Tất cả</span>
					</div>
					<div className='dashboard__action--choose-all'>
						<span className='dashboard__action--check'>
							<input type='checkbox' />
						</span>
						Chọn tất cả
					</div>
					<div className='dashboard__action--reload'>
						<Button
							icon={<TfiReload />}
							className='dashboard__action--reload-icon large-semibold'></Button>
						Tải lại
					</div>
				</div>
				<div className='dashboard__search'>
					<div className='dashboard__search--icon'>
						<TfiSearch />
					</div>
					<input type='text' placeholder='Nhập từ khóa' />
					<Button
						icon={<TfiClose />}
						className='dashboard__search--close'></Button>
					<Button
						icon={<TfiArrowRight />}
						className='dashboard__search--btn'></Button>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
