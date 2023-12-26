import { useEffect, useState } from 'react'; 
import { Link, useNavigate, useParams } from 'react-router-dom';
import { intlFormat } from 'date-fns';
import axios from 'axios';
import { route } from '../../routes';
import Layout from '../../components/public/Layout.jsx';
import { useAuthor } from '../../hooks/useAuthor';
import UserImage from '../../assets/images/authors/default.png';


export default function Author() {
    const params = useParams();
    const { author, updateAuthor } = useAuthor(params.id);
    console.log(author.data)
    const retrievedAuthor = author.data

    return (
        <Layout>
            <section className="mt-5 pt-3 d-flex justify-content-center">
                <figure>
                    <img
                        // src={('http://localhost:8000/' + author.data.image)}
                        src={(author.data.image == null) ? UserImage : ('http://localhost:8000/' + author.data.image)}
                        alt={author.data.first_name + ' ' + author.data.last_name}
                        width="100"
                        className='border border-4 border-secondary-subtle rounded-circle' />

                    <figcaption className='d-none'>
                        A photo of {author.data.first_name + ' ' + author.data.last_name}
                    </figcaption>
                </figure>
            </section>

            <section className='contact d-flex flex-column align-items-center'>
                <h2 className='name fw-bold' style={{ color: 'blueviolet'}}>{author.data.first_name + ' ' + author.data.last_name}</h2>
                <div className='d-flex gap-3 mb-3'>
                    <span className='email p-2 rounded' style={{ backgroundColor: 'blueviolet'}}><a href={`mailto:${author.data.email}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-at text-white" viewBox="0 0 16 16">
                            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914"/>
                        </svg>
                    </a></span>
                    <span className='twitter p-2 rounded' style={{ backgroundColor: 'blueviolet'}}><a href="https://twitter.com" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter-x text-white" viewBox="0 0 16 16">
                            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                        </svg>
                    </a></span>
                </div>
                <p className="fw-semibold text-secondary fs-6 mb-3">Joined: 
                {/* {intlFormat(new Date(retrievedAuthor.created_at), {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })} */}
                </p>
                <p className="fw-semibold text-secondary fs-6 mb-3"> 
                    {author.data.bio}
                    {/* {author.data.profile.bio} */}
                </p>

            </section>
        </Layout>
    )
}
