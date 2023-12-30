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
    
        // await updateAuthor(author.data)
        const formData = new FormData();
        formData.append('first_name', author.data.first_name);
        formData.append('last_name', author.data.last_name);
        formData.append('username', author.data.username);
        formData.append('email', author.data.email);
        formData.append('image', author.data.image);
        formData.append('bio', author.data.bio);

        // console.log(formData)
        await updateAuthor(author.data, formData)
    }

    // console.log(author)
    // // console.log(user.image)
    // console.log(author.data.image)

    return (
        <Layout>
            <section className="container-fluid w-100 my-4">

                <h2 className='mb-4 fw-bold' style={{ color: 'blueviolet'}}>Edit Profile</h2>

                <div className="container-fluid card rounded-0 shadow py-4 row d-flex flex-row">
                    <div className='col-md-4'>
                        <div className="card d-flex flex-column">
                            <p><img src={'http://localhost:8000/' + author.data.image} className="card-img-top" alt="..." width={100} /></p>
                            <div className="card-body text-center">
                                <h3 className="card-title fs-5">{author.data.first_name + ' ' + author.data.last_name}</h3>
                                <p className="card-text" style={{color: 'blueviolet'}}>{author.data.bio ? author.data.bio : '(User has yet to write their bio.)'}</p>
                                <div className='d-flex justify-content-around'>
                                    {/* {delayLoadAuthor()} */}
                                    <span>{ author.data.articles?.length }&nbsp;
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-body-text" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5m0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                                        </svg>    
                                    </span>
                                    <span>{ author.data.comments?.length }&nbsp;
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-text" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                                        </svg>
                                    </span>
                                    <span>{ author.data.likes?.length }&nbsp;
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                                            <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <form onSubmit={ handleSubmit } encType="multipart/form-data" className="needs-validation">
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
                                        // required 
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
                                        // required 
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
                                        // required 
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
                                        // required 
                                    />
                                </div>
                                <div className="mb-3 col-sm-12">
                                    {/* <p>Current image: <img src={`http://localhost:8000/${author.data.image}`} alt="" width={20} /></p> */}
                                    <label htmlFor="image" className="form-label">Update Image</label>
                                    <input 
                                        name="image" 
                                        id="image" 
                                        type="file" 
                                        accept="image/*" 
                                        // value={ 'http://127.0.0.1:8000/users/' + user.image ?? '' } 
                                        onChange={ event => author.setData({
                                            ...author.data,
                                            image: event.target.files[0],
                                        }) }
                                        className="form-control rounded-0" 
                                        placeholder="Add an image..." 
                                        disabled={ author.loading }
                                        // required 
                                    />
                                </div>
                                <div className="mb-3 col-sm-12">
                                    <label htmlFor="bio" className="form-label">Bio</label>
                                    <textarea 
                                        name="bio" 
                                        id="bio" 
                                        value={ author.data.bio ?? '' }
                                        onChange={ event => author.setData({
                                            ...author.data,
                                            bio: event.target.value,
                                        }) }
                                        className="form-control rounded-0" 
                                        placeholder="Sample bio" 
                                        disabled={ author.loading } 
                                        rows="2">
                                    </textarea>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className='d-flex justify-content-end'>
                                <button className="btn btn-warning rounded-0" type="submit">Update</button>
                            </div>
                            
                        </form>
                    </div>
                    
                </div>
            </section>
        </Layout>
    )
}
