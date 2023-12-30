import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { formatDistanceToNow, formatRFC7231, intlFormat } from 'date-fns';
import InfiniteScroll from "react-infinite-scroll-component";
import { route } from '../../routes';
import Layout from '../../components/public/Layout.jsx';
import Hero from '../../components/public/Hero.jsx';
import { useSubCategories } from '../../hooks/useSubCategories';
import { useArticles } from '../../hooks/useArticles';

export default function Home() {
    const { subCategories, getSubCategories } = useSubCategories();
    const { articles, error, loading, getArticles } = useArticles();

    // console.log(subCategories);
    // console.log(articles);

    // Infinite scroll
    let page = 1;
    const fetchData = (setItems, items) => {
        axios
        .get(`http://localhost:8000/api/posts/articles/paginated?_page=${page}`)
        .then((res) => {
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

    return (
        <Layout>

            <Hero />

            {(subCategories.length > 0 && !loading) ? subCategories.map(subCategory => {
                if (subCategory.articles.length > 3) {
                    return (
                        <section className="border-top mt-5 py-2">
                            <div className="d-flex justify-content-between my-3">
                                <h2 className="fw-bolder fs-4 text-uppercase" style={{color: 'blueviolet'}}>{subCategory.title}</h2>
                                <span className="text-secondary fw-bold">
                                    <Link 
                                        to={ route('sub-categories.show', { id: subCategory.id }) } 
                                        className="text-decoration-none text-secondary fw-bold">
                                        See more
                                    </Link>
                                </span>
                            </div>
                            <div className="d-flex flex-wrap justify-content-around gap-2">
                                {(articles.length > 0 && !loading) ? articles.filter(article => article.sub_category.title == subCategory.title).slice(0,4).map(filteredArticle => {
                                    return (
                                        <div className="card rounded-0 shadow-lg border-0" style={{maxWidth: '15rem'}}>
                                            <img src={'http://localhost:8000/' + filteredArticle.image} className="card-img-top rounded-0" alt={filteredArticle.title} />
                                            <div className="card-body">
                                                <p className="card-text fs-5 fw-bold">{filteredArticle.title}</p>
                                                <p className="card-text text-secondary fw-bold mt-0">by @{filteredArticle.added_by}</p>
                                            </div>
                                        </div>
                                    )
                                }): (
                                    <div className="d-flex justify-content-center my-5">
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </section>
                    )
                }
            }) : (
                <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            <section className="border-top mt-5 pt-2">
                <div className="my-3">
                    <h2 className="fw-bolder fs-4" style={{color: 'blueviolet'}}>Articles</h2>
                </div>
                {/* {(articles.length > 0 && !loading) ? articles.map(article => {
                    return (
                        <div className="card mb-3 rounded-0 shadow-lg border-0" key={article.id}>
                            <div className="row g-0">
                                <div className="col-sm-4 col-md-6">
                                    <img src={'http://localhost:8000/' + article.image} className="img-fluid rounded-0 h-100" alt={article.title} />
                                </div>
                                <div className="col-sm-8 col-md-6">
                                    <div className="card-body d-flex flex-column justify-content-between h-100">
                                        <div>
                                            <h3 className="card-title fs-6 fw-semibold" style={{color: 'blueviolet'}}>{article.sub_category.title}</h3>
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
                    )
                }) : (
                    <div className="d-flex justify-content-center my-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )} */}
                

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
                        {items.map((article) => (
                            <Link to={ route('articles.show', { id: article.id }) } >
                                <div className="card mb-3 rounded-0 shadow-lg border-end" key={article.id}>
                                    <div className="row g-0">
                                        <div className="col-sm-4 col-md-6">
                                            <img src={'http://localhost:8000/' + article.image} className="img-fluid rounded-0 h-100" alt={article.title} />
                                        </div>
                                        <div className="col-sm-8 col-md-6">
                                            <div className="card-body d-flex flex-column justify-content-between h-100">
                                                <div>
                                                    <h3 className="card-title fs-6 fw-semibold" style={{color: 'blueviolet'}}>{article.sub_category.title}</h3>
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
                        ))}
                    </div>
                </InfiniteScroll>
            </section>

        </Layout>
    )
}
