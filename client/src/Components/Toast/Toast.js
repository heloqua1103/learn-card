import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Toast({ position, className }) {
	return (
		<ToastContainer
			position={position ? position : 'top-right'}
			autoClose={2000}
			limit={1}
			hideProgressBar={false}
			newestOnTop
			closeOnClick
			rtl={false}
			pauseOnFocusLoss={false}
			draggable={false}
			pauseOnHover={false}
			theme='light'
			bodyClassName={'large-medium'}
			className={className && className}
		/>
	)
}

export default Toast
