import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { route } from '../../routes';
import Layout from '../../components/public/Layout.jsx';
import { useSubCategory } from '../../hooks/useSubCategory.jsx'; 
import '../../css/ck-editor.css'
import Article from '../../components/Articles';

export default function SubCategory() {
  // const { id } = useParams()
  // const [subCategory, setSubCategory] = useState(null)

  // useEffect(() => {
  //   const controller = new AbortController()
  //   getSubCategory(id, { signal: controller.signal })
  //   return () => controller.abort()
  // }, [id])

  // async function getSubCategory(id, { signal } = {}) {
  //   return axios.get(`http://localhost:8000/api/posts/sub-categories/${id}`, { signal })
  //     .then(response => {
  //       setSubCategory(response.data)
  //       console.log(response.data)
  //     })
  //     .catch(() => {})
  // }

  // 

  const params = useParams()
  const { subCategory, updateSubCategory } = useSubCategory(params.id)
  const navigate = useNavigate()

  // console.log(subCategory.data)
  console.log(subCategory)

  return (
    <>
      <Layout>
        {/* <ul>
          {subCategory.map(item => {
            return (
              <li>{item.title}</li>
            )
            
          })}
        </ul> */}
        <p>Hi</p>
        <div className='mt-5'>{subCategory.data.title}</div>
        {/* <div>
          {subCategory?.data?.articles?.length > 0 && subCategory.data.articles.map(article => {
            return (
              <div key={article.id}>
                <p>{article.title}</p>
                <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
              </div>
            )
          })}
        </div> */}
        <div>
          <Article />
        </div>
      </Layout>
    </>
  )
}
