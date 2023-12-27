import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { route } from '../../../routes';
import { useSubCategory } from '../../../hooks/useSubCategory';
import Layout from '../../../components/dashboard/Layout';


export default function SubCategory() {
  const params = useParams()
  const { subCategory } = useSubCategory(params.id)

  return (
    <Layout>
      <section className="container-fluid w-100 my-4">

          <h2 className='mb-4 fw-bold'>Sub-Category: <span style={{ color: 'blueviolet'}}>{ subCategory.data.title }</span></h2>

          <div className="container-fluid card rounded-0 shadow py-4">
            <div className='d-flex justify-content-end'>
              <span className='fw-semibold text-secondary'>belongs to category: <span className='text-white px-2 py-1' style={{ backgroundColor: 'blueviolet'}}>{ subCategory.data.category }</span></span>
            </div>
            <h3 className='fs-5' style={{ color: 'blueviolet'}}>Description:</h3>
            <p className='fs-4'>{ subCategory.data.description }</p> 
            <p className='text-secondary fw-semibold'>added by @
                <Link 
                    to={ route('dashboard.authors.show', { id: subCategory.data.added_by }) }>
                    <span style={{color: 'blueviolet'}}>{subCategory.data.added_by}</span>
                </Link> | {dayjs(subCategory.data.created_at).format('MMM D, YYYY')}
                {/* | {intlFormat(new Date(category.data.created_at), {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })} */}
            </p>
          </div>
      </section>
    </Layout>
  )
}
