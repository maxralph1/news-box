import { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import AuthContext from '../../../context/AuthContext';
// import { route } from '../../../routes';
import { useAuthor } from '../../../hooks/useAuthor';
import Layout from '../../../components/dashboard/Layout';
import UserImage from '../../../assets/images/authors/default.png';

export default function Index() {
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    // const [bio, setBio] = useState('');
    // const [role, setRole] = useState('');
    
    // const token = localStorage.getItem("authTokens")

    // useEffect(() => {
    //     if (token) {
    //         const decoded = jwtDecode(token) 
    //         setFirstName(decoded.first_name)
    //         setLastName(decoded.last_name)
    //         setUsername(decoded.username)
    //         setEmail(decoded.email)
    //         setBio(decoded.bio)
    //         setRole(decoded.role)
    //     }
    // }, [])

    const {user} = useContext(AuthContext)
    const { author, updateAuthor } = useAuthor(user.username)

    async function handleSubmit(event) {
        event.preventDefault()
    
        await updateAuthor(author.data)
    }

    console.log(user)

    return (
        <Layout>
            <section className="container-fluid w-100 my-4">

                <h2 className='mb-4 fw-bold' style={{ color: 'blueviolet'}}>Edit Profile</h2>

                <div className="container-fluid card rounded-0 shadow py-4">
                    <form onSubmit={ handleSubmit } className="needs-validation">
                        <div className="row g-3">
                            <div className="mb-3 col-sm-12 col-md-6">
                                <label htmlFor="first_name" className="form-label">First Name</label>
                                <input 
                                    name="first_name" 
                                    id="first_name" 
                                    type="text" 
                                    value={ author.data.first_name ?? '' }
                                    onChange={ event => author.setData({
                                        ...author.data, 
                                        first_name: event.target.value,
                                    }) }
                                    className="form-control rounded-0" 
                                    placeholder="Sample Author" 
                                    disabled={ author.loading }
                                    required 
                                />
                            </div>
                            <div className="mb-3 col-sm-12 col-md-6">
                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                <input 
                                    name="last_name" 
                                    id="last_name" 
                                    type="text" 
                                    value={ author.data.last_name ?? '' }
                                    onChange={ event => author.setData({
                                        ...author.data, 
                                        last_name: event.target.value,
                                    }) }
                                    className="form-control rounded-0" 
                                    placeholder="Sample Author" 
                                    disabled={ author.loading }
                                    required 
                                />
                            </div>
                            <div className="mb-3 col-sm-12 col-md-6">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input 
                                    name="username" 
                                    id="username" 
                                    type="text" 
                                    value={ author.data.username ?? '' }
                                    onChange={ event => author.setData({
                                        ...author.data, 
                                        username: event.target.value,
                                    }) }
                                    className="form-control rounded-0" 
                                    placeholder="Sample Author" 
                                    disabled={ author.loading }
                                    required 
                                />
                            </div>
                            <div className="mb-3 col-sm-12 col-md-6">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input 
                                    name="email" 
                                    id="email" 
                                    type="text" 
                                    value={ author.data.email ?? '' }
                                    onChange={ event => author.setData({
                                        ...author.data, 
                                        email: event.target.value,
                                    }) }
                                    className="form-control rounded-0" 
                                    placeholder="Sample Author" 
                                    disabled={ author.loading }
                                    required 
                                />
                            </div>
                            <div className="mb-3 col-sm-12">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input 
                                    name="image" 
                                    id="image" 
                                    type="file" 
                                    accept="image/*" 
                                    // value={ 'http://127.0.0.1:8000/users/' + user.image ?? '' } 
                                    onChange={ event => author.setData({
                                        ...author.data,
                                        image: event.target.files,
                                    }) }
                                    className="form-control rounded-0" 
                                    placeholder="Add an image..." 
                                    disabled={ author.loading }
                                    // required 
                                />
                            </div>
                        </div>

                        <hr className="my-4" />

                        <div className='d-flex justify-content-end'>
                            <button className="btn btn-warning rounded-0" type="submit">Update</button>
                        </div>
                        
                    </form>
                </div>
            </section>
        </Layout>
    )
}
