// import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useCategories } from '../../../hooks/useCategories';
import { useSubCategory } from '../../../hooks/useSubCategory';
import Layout from '../../../components/dashboard/Layout';


export default function EditSubCategory() {
    const { categories } = useCategories()
    const params = useParams()
    const { subCategory, updateSubCategory } = useSubCategory(params.id)
    
    async function handleSubmit(event) {
        event.preventDefault()
    
        await updateSubCategory(subCategory.data)
    }

    // function sortOptions(options, selectedValue) {
    //     return options.sort((a, b) => {
    //         if (a === selectedValue) return -1;
    //         if (b === selectedValue) return 1;
    //         return 0;
    //     });
    // }

    // const defaultValue = subCategory.data.category;
    // const [options, setOptions] = useState(() =>
    //     sortOptions(optionsProp, defaultValue)
    // );

    return (
        <Layout>
            <section className="container-fluid w-100 my-4">

                <h2 className='mb-4 fw-bold' style={{ color: 'blueviolet'}}>Edit Sub-Category</h2>

                <div className="container-fluid card rounded-0 shadow py-4">
                    <form onSubmit={ handleSubmit } className="needs-validation">
                        <div className="row g-3">
                            <div className="mb-3 col-sm-12">
                                <label htmlFor="title" className="form-label">Sub-category Title</label>
                                <input 
                                    name="title" 
                                    id="title" 
                                    type="text" 
                                    value={ subCategory.data.title ?? '' }
                                    onChange={ event => subCategory.setData({
                                        ...subCategory.data,
                                        title: event.target.value,
                                    }) }
                                    className="form-control rounded-0" 
                                    placeholder="Sample Sub-category" 
                                    disabled={ subCategory.loading }
                                    required 
                                />
                            </div>
                            <div className="mb-3 col-sm-12">
                                <label htmlFor="description" className="form-label">Sub-category Description</label>
                                <textarea 
                                    name="description" 
                                    id="description" 
                                    value={ subCategory.data.description ?? '' }
                                    onChange={ event => subCategory.setData({
                                        ...subCategory.data,
                                        description: event.target.value,
                                    }) }
                                    className="form-control rounded-0" 
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
                                    // defaultValue={ subCategory.data.category ?? '' } 
                                    value={ subCategory.data.category ?? '' } 
                                    // value={JSON.stringify({ id: subCategory.data.category ?? '' } )}
                                    onChange={ event => subCategory.setData({
                                        ...subCategory.data,
                                        category: event.target.value,
                                    }) }
                                    disabled={ subCategory.loading }
                                    className="form-select rounded-0" 
                                >
                                    { categories.length > 0 && categories
                                        // .sort(({ id: previousID }, { id: currentID }) => previousID - currentID)
                                        .map((category) => {
                                            return (
                                                <option key={ category.id } value={ category.id }>
                                                    { category.title.toUpperCase() }{' '}
                                                    { category.description && '('+category.description+')' }
                                                </option>
                                            )
                                        }) 
                                    }
                                    {/* { categories.length > 0 && categories.map((category) => {
                                            if (category.title == subCategory.data.category) {
                                                return (
                                                    <option select key={ category.id } value={ category.id }>
                                                        { category.title.toUpperCase() }{' '}
                                                        { category.description && '('+category.description+')' }
                                                    </option>
                                                )
                                            } 
                                            if (category.title != subCategory.data.category) {
                                                return (
                                                    <option key={ category.id } value={ category.id }>
                                                        { category.title.toUpperCase() }{' '}
                                                        { category.description && '('+category.description+')' }
                                                    </option>
                                                )
                                            }
                                        }) 
                                    } */}
                                </select>
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
