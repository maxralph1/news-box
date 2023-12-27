import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { route } from '../../../routes';
import { useArticle } from '../../../hooks/useArticle';
import Layout from '../../../components/dashboard/Layout';


export default function Article() {
  const params = useParams()
  const { article } = useArticle(params.id)
  // console.log(article)

  return (
    <Layout>
      <section className="container-fluid w-100 my-4">

          <h2 className='mb-4 fw-bold'><span style={{ color: 'blueviolet'}}>{ article.data.title }</span></h2>

          <div className="container-fluid card rounded-0 shadow py-4">
            {/* <div className='d-flex flex-column align-items-end gap-2'>
              <span className='fw-semibold text-secondary'>belongs to category: <span className='text-white px-2 py-1' style={{ backgroundColor: 'blueviolet'}}>{ article.data.category.title }</span></span>
              <span className='fw-semibold text-secondary'>belongs to sub-category: <span className='text-white px-2 py-1' style={{ backgroundColor: 'blueviolet'}}>{ article.data.sub_category.title }</span></span>
            </div> */}

            <p className='text-secondary fw-semibold'>added by @
                <Link 
                    to={ route('dashboard.authors.show', { id: article.data.added_by }) }>
                    <span style={{color: 'blueviolet'}}>{article.data.added_by}</span>
                </Link> | {dayjs(article.data.created_at).format('MMM D, YYYY')}
            </p>

            {/* <h3 className='fs-5' style={{ color: 'blueviolet'}}>Description:</h3>  */}
            <p dangerouslySetInnerHTML={{ __html: article.data.body }}></p>
          </div>
          
      </section>
    </Layout>
  )
}
