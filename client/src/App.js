import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { publicRoutes } from '~/Routes'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{publicRoutes.map((route, index) => (
					<Route key={index} path={route.path} element={<route.component />} />
				))}
				<Route path='/' element={<Navigate to='/login' />}></Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
