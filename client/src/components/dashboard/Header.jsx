import { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import AuthContext from '../../context/AuthContext';
import logo from '../../assets/images/logo.png';


export default function Header() {
    const [firstName, setFirstName] = useState('');
    const {user, logoutUser} = useContext(AuthContext)
    const token = localStorage.getItem("authTokens")

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token) 
            setFirstName(decoded.first_name)
        }
    }, [])

    const hour = new Date().getHours();

    return (
        <header className="navbar sticky-top flex-md-nowrap p-0 shadow" style={{backgroundColor: 'blueviolet'}}>
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" href="#">
                <img src={logo} alt="NewsBox" width='80' />
            </a>

            <ul className="navbar-nav flex-row d-md-none">
                <li className="text-white align-self-center">
                    {hour <= 23 && hour >= 16 
                        ? 'Good evening ' 
                        : hour <= 15 && hour >= 12
                        ? 'Good afternoon ' 
                        : hour <= 11 && hour >= 3
                        ? 'Good morning '
                        : 'Hi'} 
                    {firstName} !
                </li>
                <li className="nav-item text-nowrap">
                    <button className="nav-link px-3 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </button>
                </li>
                <li className="nav-item text-nowrap">
                    <button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-filter-right"
                                viewBox="0 0 16 16">
                            <path
                                d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5" />
                        </svg>
                    </button>
                </li>
            </ul>

            <div id="navbarSearch" className="navbar-search w-100 collapse">
                <input className="form-control w-100 rounded-0 border-0" type="text" placeholder="Enter your search ..." aria-label="Search" />
            </div>

            <div className='d-none d-md-block px-4'>
                <span className="text-white align-self-center">
                    {hour <= 23 && hour >= 16 
                        ? 'Good evening ' 
                        : hour <= 15 && hour >= 12
                        ? 'Good afternoon ' 
                        : hour <= 11 && hour >= 3
                        ? 'Good morning '
                        : 'Hi '} 
                    {firstName} !
                </span>
            </div>
        </header>
    )
}
