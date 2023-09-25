import { Link } from 'react-router-dom'
import './Button.scss'

function Button({
	to,
	href,
	icon,
	children,
	className,
	id,
	onClick,
	...passProps
}) {
	let Comp = 'button'

	const props = {
		onClick,
		...passProps,
	}

	if (to) {
		props.to = to
		Comp = Link
	} else if (href) {
		props.href = href
		Comp = 'a'
	}

	return (
		<Comp
			id={id && id}
			className={className ? `button ${className}` : 'button'}
			{...props}>
			{icon && <span className='button_icon'>{icon}</span>}
			{children && <span className='normal-semibold'>{children}</span>}
		</Comp>
	)
}

export default Button
