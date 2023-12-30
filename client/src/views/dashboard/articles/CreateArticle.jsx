import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useCategories } from '../../../hooks/useCategories';
import { useSubCategories } from '../../../hooks/useSubCategories';
import { useArticle } from '../../../hooks/useArticle';
import Layout from '../../../components/dashboard/Layout';


export default function CreateArticle() {
    const { categories } = useCategories()
    const { subCategories } = useSubCategories()
    const { article, createArticle } = useArticle()
    
    async function handleSubmit(event) {
        event.preventDefault()

        // await createArticle(article)

        const formData = new FormData();
        formData.append('title', article.data.title);
        formData.append('category', article.data.category);
        formData.append('sub_category', article.data.sub_category);
        formData.append('image', article.data.image);
        formData.append('image_description', article.data.image_description);
        formData.append('body', article.data.body);

        // console.log(formData)
        await createArticle(formData)
    }

    return (
        <Layout>
            <section className="container-fluid w-100 my-4">

                <h2 className='mb-4 fw-bold' style={{ color: 'blueviolet'}}>Create Article</h2>

                <div className="container-fluid card rounded-0 shadow py-4">
                    <form onSubmit={ handleSubmit } encType="multipart/form-data" className="needs-validation">
                        <div className="row g-3">
                            <div className="mb-3 col-sm-12">
                                <label htmlFor="title" className="form-label">Title</label>
                                <textarea 
                                    name="title" 
                                    id="title" 
                                    value={ article.data.title ?? '' }
                                    onChange={ event => article.setData({
                                        ...article.data,
                                        title: event.target.value,
                                    }) }
                                    className="form-control rounded-0" 
                                    placeholder="Sample title" 
                                    disabled={ article.loading } 
                                    required 
                                    rows="3">
                                </textarea>
                            </div>
                            <div className="mb-3 col-sm-6">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select 
                                    name="category" 
                                    id="category" 
                                    value={ article.data.category ?? '' } 
                                    onChange={ event => article.setData({
                                    ...article.data,
                                    category: event.target.value,
                                    }) }
                                    disabled={ article.loading }
                                    className="form-select rounded-0" 
                                    // required
                                >
                                    <option>Select a category ...</option>
                                    { categories.length > 0 && categories.map((category) => {
                                    return <option key={ category.id } value={ category.id }>
                                                { category.title.toUpperCase() }{' '}
                                                { category.description && '('+category.description+')' }
                                            </option>
                                    }) }
                                </select>
                            </div>
                            <div className="mb-3 col-sm-6">
                                <label htmlFor="sub_category" className="form-label">Sub-Category</label>
                                <select 
                                    name="sub_category" 
                                    id="sub_category" 
                                    value={ article.data.sub_category ?? '' } 
                                    onChange={ event => article.setData({
                                    ...article.data,
                                    sub_category: event.target.value,
                                    }) }
                                    disabled={ article.loading }
                                    className="form-select rounded-0" 
                                    // required
                                >
                                    <option>Select a sub-category ...</option>
                                    { subCategories.length > 0 && subCategories.map((subCategory) => {
                                    return <option key={ subCategory.id } value={ subCategory.id }>
                                                { subCategory.title.toUpperCase() }{' '}
                                                { subCategory.description && '('+subCategory.description+')' }
                                            </option>
                                    }) }
                                </select>
                            </div>
                            <div className="mb-3 col-sm-12">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input 
                                    name="image" 
                                    id="image" 
                                    type="file" 
                                    accept="image/*" 
                                    // value={ article.data.image ?? '' }
                                    onChange={ event => article.setData({
                                        ...article.data,
                                        image: event.target.files[0],
                                    }) }
                                    className="form-control rounded-0" 
                                    placeholder="Add an image..." 
                                    disabled={ article.loading }
                                    // required 
                                />
                            </div>
                            <div className="mb-3 col-sm-12">
                                <label htmlFor="image_description" className="form-label"> Image Description</label>
                                <input 
                                    name="image_description" 
                                    id="image_description" 
                                    type="text" 
                                    value={ article.data.image_description ?? '' }
                                    onChange={ event => article.setData({
                                        ...article.data,
                                        image_description: event.target.value,
                                    }) }
                                    className="form-control rounded-0" 
                                    placeholder="e.g. Daenarys Stormborn on the Dragon" 
                                    disabled={ article.loading }
                                    required 
                                />
                            </div>
                            <div className="mb-3 col-sm-12">
                                <label htmlFor="body" className="form-label">Body</label>
                                <CKEditor 
                                    editor={ ClassicEditor }
                                    data="Start typing in your article ..."
                                    onReady={ editor => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log( 'Editor is ready to use!', editor );
                                        console.log(editor)
                                    } }
                                    onChange={ ( event, editor ) => {
                                        console.log( event );
                                        const data = editor.getData()
                                        return article.setData({
                                            ...article.data,
                                            body: data,
                                        })
                                    } }
                                    onBlur={ ( event, editor ) => {
                                        console.log( 'Blur.', editor );
                                    } }
                                    onFocus={ ( event, editor ) => {
                                        console.log( 'Focus.', editor );
                                    } }
                                />
                            </div> 
                        </div>

                        <hr className="my-4" />

                        <div className='d-flex justify-content-end'>
                            <button className="btn btn-secondary rounded-0" type="submit">Save</button>
                        </div>
                        
                    </form>
                </div>

            </section>
        </Layout>
    )
}
