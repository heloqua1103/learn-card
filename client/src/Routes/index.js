// Page
import HomePage from '~/Pages/HomePage/HomePage'
import LoginPage from '~/Pages/LoginPage/LoginPage'
import RegisterPage from '~/Pages/RegisterPage/RegisterPage'
import ForgotPasswordPage from '~/Pages/ForgotPasswordPage/ForgotPasswordPage'
import ResetPassowrdPage from '~/Pages/ResetPassowrdPage/ResetPassowrdPage'
import InformationUserPage from '~/Pages/InformationUserPage/InformationUserPage'
import ProfilePage from '~/Pages/ProfilePage/ProfilePage'

const publicRoutes = [
	{ path: '/home', component: HomePage },
	{ path: '/login', component: LoginPage },
	{ path: '/register', component: RegisterPage },
	{ path: '/forgot-password', component: ForgotPasswordPage },
	{ path: '/reset-pasword/:resetToken', component: ResetPassowrdPage },
	{ path: '/user-profile/:uid', component: InformationUserPage },
	{ path: '/profile', component: ProfilePage },
]

export { publicRoutes }
