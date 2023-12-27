import { Link, useParams } from 'react-router-dom';
// import { intlFormat } from 'date-fns';
import dayjs from 'dayjs';
import { route } from '../../../routes';
import { useCategory } from '../../../hooks/useCategory';
import Layout from '../../../components/dashboard/Layout';


export default function Category() {
    const params = useParams()
    const { category } = useCategory(params.id)

    return (
        <Layout>
            <section className="container-fluid w-100 my-4">

                <h2 className='mb-4 fw-bold'>Category: <span style={{ color: 'blueviolet'}}>{ category.data.title }</span></h2>

                <div className="container-fluid card rounded-0 shadow py-4">
                  <h3 className='fs-5' style={{ color: 'blueviolet'}}>Description:</h3>
                  <p className='fs-4'>{ category.data.description }</p> 
                  <p className='text-secondary fw-semibold'>added by @
                      <Link 
                          to={ route('dashboard.authors.show', { id: category.data.added_by }) }>
                          <span style={{color: 'blueviolet'}}>{category.data.added_by}</span>
                      </Link> | {dayjs(category.data.created_at).format('MMM D, YYYY')}
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
