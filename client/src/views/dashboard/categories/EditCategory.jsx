import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { route } from '../../../routes';
import { useCategory } from '../../../hooks/useCategory';
import Layout from '../../../components/dashboard/Layout';
import axios from 'axios'


export default function EditCategory() {
    const params = useParams()
    const { category, updateCategory } = useCategory(params.id)
    const navigate = useNavigate()
    // const [focusCategory, setFocusCategory] = useState({})
    console.log(category.data)
    // console.log(getCategory)

    // useEffect(() => {
    //     console.log(getCategory(params.id))
    // }, [params.id])

    // // Initially fetch category in question
    // useEffect(() => {
    //     const controller = new AbortController()
    //     getCategory(params, { signal: controller.signal })
    //     return () => controller.abort()
    // }, [params.id])

    // async function getCategory(params, { signal } = {}) {
    //     return axios.get(`http://localhost:8000/api/posts/categories/${params.id}`, { signal })
    //     .then(response => {
    //         setFocusCategory(response.data)
    //         console.log(response.data)
    //     })
    //     .catch(() => {})
    // }

    // Update category
    async function handleSubmit(event) {
        event.preventDefault()
    
        await updateCategory(category.data)
    }

    

    return (
        <Layout>
            <div className="container w-100">

                <h2 className='my-4'>Edit Category</h2>

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
                            <button className="btn btn-warning text-end" type="submit">Update</button>
                        </div>
                        
                    </form>
                </div>
                
            </div>
        </Layout>
    )
}
