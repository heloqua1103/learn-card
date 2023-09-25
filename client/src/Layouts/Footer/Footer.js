import './Footer.scss'
import { FacebookIcon } from '~/assets/Icons'
import { Button } from '~/Components/components'

import { Link } from 'react-router-dom'


function Footer() {
    return (
        <div className='footer'>
            <div className="footer-item">
                Về
                <Link>Chính sách</Link>
            </div>
            <div className="footer-item">
                Về
                <Link>LearnCard</Link>
            </div>
            <div className='social'>
                <div className='social__footer--facebook'>
                    <Button icon={<FacebookIcon />}></Button>
                </div>
            </div>
        </div>
    )
}

export default Footer