import { Link, useNavigate } from 'react-router-dom';
import { route } from '../../../routes';
import { useCategories } from '../../../hooks/useCategories';
import { useSubCategory } from '../../../hooks/useSubCategory';
import Layout from '../../../components/dashboard/Layout';


export default function CreateSubCategory() {
    const { categories } = useCategories()
    const { subCategory, createSubCategory } = useSubCategory()
    const navigate = useNavigate()
    
    async function handleSubmit(event) {
        event.preventDefault()
    
        await createSubCategory(subCategory.data)
    }

    return (
        <Layout>
            <div className="container w-100">

                <h2 className='my-4'>Create Sub-Category</h2>

                <div className="container card shadow py-4">
                    <form onSubmit={ handleSubmit } className="needs-validation">
                        <div className="row g-3">
                            <div className="mb-3 col-sm-12">
                                <label htmlFor="title" className="form-label">Sub-Category Title</label>
                                <input 
                                    name="title" 
                                    id="title" 
                                    type="text" 
                                    value={ subCategory.data.title ?? '' }
                                    onChange={ event => subCategory.setData({
                                        ...subCategory.data,
                                        title: event.target.value,
                                    }) }
                                    className="form-control" 
                                    placeholder="Sample Sub-category" 
                                    disabled={ subCategory.loading }
                                    required 
                                />
                            </div>
                            <div className="mb-3 col-sm-12">
                                <label htmlFor="description" className="form-label">Category Description</label>
                                <textarea 
                                    name="description" 
                                    id="description" 
                                    value={ subCategory.data.description ?? '' }
                                    onChange={ event => subCategory.setData({
                                        ...subCategory.data,
                                        description: event.target.value,
                                    }) }
                                    className="form-control" 
                                    placeholder="Sample Sub-category description" 
                                    disabled={ subCategory.loading } 
                                    required 
                                    rows="3">
                                </textarea>
                            </div>
                            <div className="mb-3 col-sm-12">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select 
                                    name="category" 
                                    id="category" 
                                    value={ subCategory.data.category ?? '' } 
                                    onChange={ event => subCategory.setData({
                                    ...subCategory.data,
                                    category: event.target.value,
                                    }) }
                                    disabled={ subCategory.loading }
                                    className="form-select" 
                                    required
                                >
                                    { categories.length > 0 && categories.map((category) => {
                                    return <option key={ category.id } value={ category.id }>
                                                { category.title.toUpperCase() }{' '}
                                                { category.description && '('+category.description+')' }
                                            </option>
                                    }) }
                                </select>
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
