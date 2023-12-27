import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { route } from '../../../routes';
import { useAuthors } from '../../../hooks/useAuthors';
import { useAuthor } from '../../../hooks/useAuthor';
import Layout from '../../../components/dashboard/Layout';


export default function Authors() {
    const { authors,  getAuthors } = useAuthors();
    const { destroyAuthor } = useAuthor()

    return (
        <Layout>
            <h2 className='my-4 fw-bold' style={{ color: 'blueviolet'}}>Authors</h2>

            <section className='mb-5'>
                <div className="card rounded-0 w-100 shadow">

                    <ul className="list-group list-group-flush">
                        {(authors.length > 0) ? authors.map(author => {
                        return (
                            <li key={author.id} className="list-group-item">
                                <div className="d-grid gap-2 d-md-flex justify-content-end mb-3">
                                    <Link 
                                        to={ route('dashboard.authors.edit', { id: author.username }) }
                                        className="btn btn-sm btn-outline-warning me-md-2 text-dark rounded-0" type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg> &nbsp;
                                        Modify
                                    </Link>
                                    <button 
                                        className="btn btn-sm btn-outline-danger rounded-0" 
                                        type="button" 
                                        onClick={ async () => {
                                            await destroyAuthor(author)
                                            await getAuthors()
                                        } }>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash2" viewBox="0 0 16 16">
                                            <path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2M3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793"/>
                                        </svg> &nbsp;
                                        Delete
                                    </button>
                                </div>
                                <Link 
                                    to={ route('dashboard.authors.show', { id: author.username }) } className='text-dark'>
                                    <h4 className='fw-bold fs-5'>{author.first_name ? (author.first_name + ' ' + author.last_name) : '(User has yet to set their name)'}</h4>
                                    <p>@<span className='fw-semibold' style={{color: 'blueviolet'}}>{author.username}</span></p>
                                    <p className='fw-semibold text-secondary'>joined: | {dayjs(author.created_at).format('MMM D, YYYY')}</p>
                                </Link>
                            </li>
                        )}) : (
                            <div className="d-flex justify-content-center my-5">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
            </section>
        </Layout>
    )
}
