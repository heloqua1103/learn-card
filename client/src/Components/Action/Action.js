import './Action.scss'
import Popup from 'reactjs-popup'
import { Modal } from '~/Layouts/Layout'
import { Button } from '../components'

import { AiOutlineFolderAdd, AiOutlineDelete } from 'react-icons/ai'
import { TfiPlus, TfiPencilAlt } from 'react-icons/tfi'

function Action({ data }) {
	return (
		<div className='action'>
			<Popup
				trigger={<Button icon={<TfiPlus />} className={'action--add'} />}
				modal
				nested>
				{close => <Modal onClick={close} />}
			</Popup>
			<Button
				icon={<TfiPencilAlt />}
				value={data ? data.length : 0}
				className={'action--practice'}></Button>
			<Button
				icon={<AiOutlineDelete />}
				value='0'
				className={'disabled action--delete'}></Button>
			<Button
				icon={<AiOutlineFolderAdd />}
				value='0'
				className={'disabled action--folder'}></Button>
		</div>
	)
}

export default Action
