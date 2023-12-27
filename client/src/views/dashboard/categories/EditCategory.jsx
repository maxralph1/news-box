import { useParams } from 'react-router-dom';
import { useCategory } from '../../../hooks/useCategory';
import Layout from '../../../components/dashboard/Layout';


export default function EditCategory() {
    const params = useParams()
    const { category, updateCategory } = useCategory(params.id)

    async function handleSubmit(event) {
        event.preventDefault()
    
        await updateCategory(category.data)
    }

    return (
        <Layout>
            <section className="container-fluid w-100 my-4">

                <h2 className='mb-4 fw-bold' style={{ color: 'blueviolet'}}>Edit Category</h2>

                <div className="container-fluid card rounded-0 shadow py-4">
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
                                    className="form-control rounded-0" 
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
                                    className="form-control rounded-0" 
                                    disabled={ category.loading } 
                                    required 
                                    rows="3">
                                </textarea>
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
