import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { route } from '../../routes';
import { useCategories } from '../../hooks/useCategories';
import { useSubCategories } from '../../hooks/useSubCategories';
import AuthContext from '../../context/AuthContext';
// import { useSubCategory } from '../../hooks/useSubCategory';
import logo from '../../assets/images/logo.png';


export default function NavBar() {
    const [firstName, setFirstName] = useState('');
    const {user, logoutUser} = useContext(AuthContext)
    const token = localStorage.getItem("authTokens")
    const { categories, error, loading, getCategories } = useCategories();
    const { subCategories, getSubCategories } = useSubCategories();

    // console.log(categories);
    // console.log(subCategories);
    // console.log(user);

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token) 
            if (decoded.first_name == user.first_name) {
                setFirstName(decoded.first_name)
            } else {
                const navigate = useNavigate();
                navigate(route('login'));
            }
            
        }
    }, [])

    const hour = new Date().getHours();

    const greeting = () => {
        
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top pt-0" aria-label="Fifth navbar example" style={{backgroundColor: 'blueviolet'}}>
                <div className="container">
                    <div>
                        <h1>
                            <Link 
                                to={route('home')}
                                className="navbar-brand fw-bolder">
                                <img src={logo} alt="NewsBox" width='90' />
                            </Link>
                        </h1>
                    </div>
                    <div>
                        <span className="text-white mx-2 d-md-none">
                            {token ? 
                                <>
                                    <span className="d-none d-md-block">
                                        {hour <= 23 && hour >= 16 
                                            ? 'Good evening ' 
                                            : hour <= 15 && hour >= 12
                                            ? 'Good afternoon ' 
                                            : hour <= 11 && hour >= 3
                                            ? 'Good morning '
                                            : 'Hi '} 
                                        {user.first_name} !
                                    </span>
                                    <span 
                                        role='button'
                                        onClick={logoutUser}
                                        className='text-white'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-closed" viewBox="0 0 16 16">
                                            <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z"/>
                                            <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0"/>
                                        </svg>
                                    </span>
                                </>
                            : (
                                <Link to={ route('login') } className='text-decoration-none text-white'>Login</Link>
                            )}
                        </span>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05"
                            aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-filter-right"
                                viewBox="0 0 16 16">
                                <path
                                    d="M14 10.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0 0 1h7a.5.5 0 0 0 .5-.5m0-3a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0 0 1h11a.5.5 0 0 0 .5-.5" />
                            </svg>
                        </button>
                    </div>
                    
            
                    <div className="collapse navbar-collapse" id="navbarsExample05">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {(categories.length > 0 && !loading) ? categories.map(category => {
                                return (
                                    <li key={category.id} className="categories nav-item dropdown">
                                        {(category.sub_categories.length > 0) 
                                            ? <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                                            aria-expanded="false">{category.title.slice(0, 15)}</a>
                                            : <a className="nav-link" href="#" data-bs-toggle="dropdown"
                                            aria-expanded="false">{category.title.slice(0, 15)}</a>}

                                        {(category.sub_categories.length > 0) && 
                                            <ul className="dropdown-menu rounded-0">
                                                {category.sub_categories.map(subCategory => {
                                                    return (
                                                        <a
                                                            key={subCategory.id} 
                                                            href={ route('sub-categories.show', { id: subCategory.id }) }
                                                            className="sub-category dropdown-item"
                                                        >
                                                            {subCategory.title}
                                                        </a>
                                                    )
                                                })}
                                            </ul>
                                        }
                                    </li>
                                )
                            }) : (
                                <div className="d-flex justify-content-center my-5">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}
                            
                        </ul>
                        <div className="d-flex align-items-center text-white column-gap-3">
                            <form role="search">
                                <input className="form-control rounded-0" type="search" placeholder="Search" aria-label="Search" />
                            </form>
                            {token ? 
                                <>
                                    <span className="d-none d-md-block">
                                        {hour <= 23 && hour >= 16 
                                            ? 'Good evening ' 
                                            : hour <= 15 && hour >= 12
                                            ? 'Good afternoon ' 
                                            : hour <= 11 && hour >= 3
                                            ? 'Good morning '
                                            : 'Hi '} 
                                        {firstName} !
                                    </span>
                                    <span 
                                        role='button'
                                        onClick={logoutUser}
                                        className='text-white mx-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-closed" viewBox="0 0 16 16">
                                            <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3zm1 13h8V2H4z"/>
                                            <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0"/>
                                        </svg>
                                    </span>
                                </>
                            : (
                                <Link to={ route('login') } className='text-decoration-none text-white'>Login</Link>
                            )}
                        </div>
                        
                    </div>
                </div>
            </nav>
        </header>
    )
}
