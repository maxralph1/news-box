import { Link } from 'react-router-dom';
import { route } from '../../routes';
import '../../assets/auth.css';
import Logo from '../../assets/images/logo2_transparent.png'


export default function Layout({children}) {
    return (
        <div className="d-flex flex-column align-items-center py-4 bg-body-tertiary min-vh-100">
            <div className=''>
                <Link to={ route('home') }>
                    <img src={Logo} alt="NewsBox Logo" width='200' />
                </Link>
                
            </div>
            
            <main className="form-signin w-100 m-auto">
                {children}
            </main>
        </div>
    )
}
