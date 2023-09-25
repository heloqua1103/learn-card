import React from 'react'
import { FolderImg } from '~/assets/Icons'
import './EmptyFolder.scss'

function EmptyFolder({ children = 'Không có dữ liệu', className }) {
	return (
		<div className={!className ? 'emptyFolder' : `emptyFolder ${className}`}>
			<FolderImg />
			<p className='large-regular'>{children}</p>
		</div>
	)
}

export default EmptyFolder
