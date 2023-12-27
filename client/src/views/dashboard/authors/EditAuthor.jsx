import { useParams } from 'react-router-dom';
import { useAuthor } from '../../../hooks/useAuthor';
import Layout from '../../../components/dashboard/Layout';


export default function EditAuthor() {
    const params = useParams()
    const { author, updateAuthor } = useAuthor(params.id)

    async function handleSubmit(event) {
        event.preventDefault()
    
        await updateAuthor(author.data)
    }

    return (
        <Layout>
            <section className="container-fluid w-100 my-4">

                <h2 className='mb-4 fw-bold' style={{ color: 'blueviolet'}}>Edit Author</h2>

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
