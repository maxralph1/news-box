import { useEffect, useState } from 'react'; 
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { intlFormat } from 'date-fns';
import InfiniteScroll from "react-infinite-scroll-component";
import { route } from '../../routes';
import Layout from '../../components/public/Layout.jsx';
import { useCategories } from '../../hooks/useCategories';
import { useCategory } from '../../hooks/useCategory.jsx';
import { useArticles } from '../../hooks/useArticles';
import { useArticle } from '../../hooks/useArticle';

export default function SubCategory() {
  // // const { id } = useParams();
  const params = useParams();
  // const { subCategories, getSubCategories } = useSubCategories();
  const { category, updateCategory } = useCategory(params.id);
  // const { articles, error, loading, getArticles } = useArticles();
  // const navigate = useNavigate();

  // console.log(subCategory)
  // console.log(subCategory.data)

  // Infinite scroll
  let page = 1;
  const fetchData = (setItems, items) => {
      axios.get(`http://127.0.0.1:8000/api/posts/categories/${params.id}/articles/paginated?_page=${page}`)
        .then((res) => {
          console.log(res)
          setItems([...items, ...res.data]);
          page = page + 1;
      });
  };
  
  // const refresh = (setItems) => {};

  const [items, setItems] = useState([]);
  
  useEffect(()=>{
      fetchData(setItems,items)
  },[])
  // end Infinite scroll

  console.log(items.slice(0,1))

  return (
    <Layout>        

      <section className="border-top mt-5 pt-2">
        <div className="my-3">
          <h2 className="fw-bolder" style={{color: 'blueviolet'}}>{category.data.title}</h2>
          <p className="fs-5 fw-semibold">{category.data.description}</p>
        </div>


        {(items.length > 3) && (
          <section className='border-top my-5 pt-2 hero mt-5'>
            <div className="row row-gap-4">
              {items.slice(0, 1).map(heroArticle => {
                return (
                  <section className="col-sm-12 col-lg-8">
                    <Link to={ route('articles.show', { id: heroArticle.id }) }>
                      <div className="card text-bg-dark rounded-0 border-0 shadow-lg" key={heroArticle.id}>
                        <img src={'http://localhost:8000/' + heroArticle.image} className="card-img rounded-0" alt="..." />
                        <div className="card-img-overlay d-flex flex-column justify-content-end">
                            <p className="card-text fs-3 fw-semibold" style={{textShadow: '.2px .2px 1px black'}}>{heroArticle.title}</p>
                            <p className="card-text fs-5 fw-semibold" style={{textShadow: '.2px .2px 1px black'}}><small>by @{heroArticle.added_by} |
                            {intlFormat(new Date(heroArticle.created_at), {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                            </small></p>
                        </div>
                      </div>
                    </Link>
                      
                  </section>
                )
              })}

              <aside className="col-sm-12 col-lg-4 d-flex flex-column">
                {items.slice(1,4).map(heroAsideArticle => {
                  return (
                    <Link to={ route('articles.show', { id: heroAsideArticle.id }) }>
                      <div className="card mb-3 shadow-lg rounded-0 border-0" key={heroAsideArticle.id}>
                        <div className="card-body">
                          <p className="card-text fw-semibold">{heroAsideArticle.title}</p>
                          <p className="card-text fw-semibold text-secondary fs-6">by @{heroAsideArticle.added_by} | {intlFormat(new Date(heroAsideArticle.created_at), {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                          })}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </aside>
            </div>
          </section>
        )}


        <InfiniteScroll
            dataLength={items.length}
            next={() => {
                fetchData(setItems, items);
            }}
            hasMore={true}
            loader={
                <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
            endMessage={
                <p style={{ textAlign: "center" }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
          <div style={{ minHeight: "100vh" }}>
            {(items.length > 3) 
              ? items.slice(4).map((article) => { 
                  return (
                    <Link to={ route('articles.show', { id: article.id }) }>
                      <div className="card mb-3 rounded-0 shadow-lg border-end" key={article.id}>
                        <div className="row g-0">
                            <div className="col-sm-4 col-md-6">
                                <img src={'http://localhost:8000/' + article.image} className="img-fluid rounded-0 h-100" alt={article.title} />
                            </div>
                            <div className="col-sm-8 col-md-6">
                                <div className="card-body d-flex flex-column justify-content-between h-100">
                                    <div>
                                        <p className="card-text fs-5 fw-semibold">{article.title}</p>
                                    </div>
                                    <div>
                                        <p className="card-text fw-semibold text-secondary fs-6">by @{article.added_by} | {intlFormat(new Date(article.created_at), {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}</p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                      </div>
                    </Link>
              )}) : (
                  items.map((article) => { 
                  return (
                    <Link to={ route('articles.show', { id: article.id }) }>
                      <div className="card mb-3 rounded-0 shadow-lg border-end" key={article.id}>
                        <div className="row g-0">
                            <div className="col-sm-4 col-md-6">
                                <img src={'http://localhost:8000/' + article.image} className="img-fluid rounded-0 h-100" alt={article.title} />
                            </div>
                            <div className="col-sm-8 col-md-6">
                                <div className="card-body d-flex flex-column justify-content-between h-100">
                                    <div>
                                        <p className="card-text fs-5 fw-semibold">{article.title}</p>
                                    </div>
                                    <div>
                                        <p className="card-text fw-semibold text-secondary fs-6">by @{article.added_by} | {intlFormat(new Date(article.created_at), {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}</p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                      </div>
                    </Link>
                )}))
              } 
          </div>
        </InfiniteScroll>
      </section>
    </Layout>
  )
}
