import { Link, useNavigate } from 'react-router-dom';
import { route } from '../../../routes';
import { useCategory } from '../../../hooks/useCategory';
import Layout from '../../../components/dashboard/Layout';


export default function CreateCategory() {
    const { category, createCategory } = useCategory()
    const navigate = useNavigate()
    
    async function handleSubmit(event) {
        event.preventDefault()
    
        await createCategory(category.data)
    }

    return (
        <Layout>
            <div className="container w-100">

                <h2 className='my-4'>Create Category</h2>

                <div className="container card shadow py-4">
                    <form onSubmit={ handleSubmit } className="needs-validation">
                        <div className="row g-3">
                            <div className="mb-3 col-sm-12">
                                <label htmlFor="title" className="form-label">Category Title</label>
                                <input 
                                    name="title" 
                                    id="title" 
                                    type="text" 
                                    value={ category.data.title ?? '' }
                                    onChange={ event => category.setData({
                                        ...category.data,
                                        title: event.target.value,
                                    }) }
                                    className="form-control" 
                                    placeholder="Sample Category" 
                                    disabled={ category.loading }
                                    required 
                                />
                            </div>
                            <div className="mb-3 col-sm-12">
                                <label htmlFor="description" className="form-label">Category Description</label>
                                <textarea 
                                    name="description" 
                                    id="description" 
                                    value={ category.data.description ?? '' }
                                    onChange={ event => category.setData({
                                        ...category.data,
                                        description: event.target.value,
                                    }) }
                                    className="form-control" 
                                    disabled={ category.loading } 
                                    required 
                                    rows="3">
                                </textarea>
                            </div>
                        </div>

                        <hr className="my-4" />

                        <div className='d-flex justify-content-end'>
                            <button className="btn btn-secondary text-end" type="submit">Save</button>
                        </div>
                        
                    </form>
                </div>

            </div>
        </Layout>
    )
}
