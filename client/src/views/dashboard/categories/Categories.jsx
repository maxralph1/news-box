import { Link } from 'react-router-dom';
import { route } from '../../../routes';
import { useCategories } from '../../../hooks/useCategories';
import { useCategory } from '../../../hooks/useCategory';
import Layout from '../../../components/dashboard/Layout';


export default function Categories() {
    const { categories,  getCategories } = useCategories();
    const { destroyCategory } = useCategory()

    return (
        <Layout>
            <h2 className='my-4'>Categories</h2>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                <Link 
                    to={ route('dashboard.categories.create') }
                    className="btn btn-sm btn-outline-secondary" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                    </svg> &nbsp;
                    Add Category
                </Link>
            </div>

            <section className='mb-5'>
                <div className="card w-100 shadow">

                    <ul className="list-group list-group-flush">
                        {(categories.length > 0) ? categories.map(category => {
                        return (
                            <li key={category.id} className="list-group-item">
                                <div className="d-grid gap-2 d-md-flex justify-content-end mb-3">
                                    <Link 
                                        to={ route('dashboard.categories.edit', { id: category.id }) }
                                        className="btn btn-sm btn-outline-warning me-md-2 text-dark" type="button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg> &nbsp;
                                        Modify
                                    </Link>
                                    <button 
                                        className="btn btn-sm btn-outline-danger" 
                                        type="button" 
                                        onClick={ async () => {
                                            await destroyCategory(category)
                                            await getCategories()
                                        } }>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash2" viewBox="0 0 16 16">
                                            <path d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2M3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793"/>
                                        </svg> &nbsp;
                                        Delete
                                    </button>
                                </div>
                                <Link 
                                    to={ route('dashboard.categories.show', { id: category.id }) } className='text-dark'>
                                    <h4 className='fw-bold fs-5'>{category.title.substring(0, 25)}</h4>
                                    <p>{category.description.substring(0, 50)}</p>
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
