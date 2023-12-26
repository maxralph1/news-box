import { useEffect, useState } from 'react'; 
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { intlFormat } from 'date-fns';
import { route } from '../../routes';
import Layout from '../../components/public/Layout.jsx';
import { useArticle } from '../../hooks/useArticle';

export default function Article() {
  const params = useParams();
  const { article, updateArticle } = useArticle(params.id);
  console.log(article)

  return (
    <Layout>
      <section className="mt-5 pt-3">
        <div className="my-3">
          <h2 className="fw-bolder">{article.data.title}</h2>
          <p className="fs-6 fw-semibold text-secondary">By @
          <span>
            <Link 
              to={ route('authors.show', { id: article.data.added_by }) }
              style={{color: 'blueviolet', textDecoration: 'underline'}}
            >
              {article.data.added_by}
            </Link> | 
            {/* {intlFormat(new Date(article.data.created_at), {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            })} */}
          </span>
            
          </p>
          {/* <p className="fs-5 fw-semibold">{article.data.body}</p> */}
        </div>
      </section>

      <section>
        <figure>
          <img src={'http://localhost:8000/' + article.data.image} alt={article.data.title} />
          <figcaption className='text-secondary'>{article.data.image_description}</figcaption>
        </figure>
      </section>

      <section>
        <div dangerouslySetInnerHTML={{ __html: article.data.body }}></div>
      </section>
    </Layout>
  )
}
