import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { route } from '../../routes';
import Layout from '../../components/public/Layout.jsx';
import Hero from '../../components/public/Hero.jsx';
import Aside from '../../components/public/Aside.jsx';
import { useArticles } from '../../hooks/useArticles';
import { useState } from 'react';
// import { useArticle } from '../../hooks/useArticle';

export default function Home() {
    const { articles, error, loading, getArticles } = useArticles();
    // const {destroyArticle, errors } = useArticle();
    const [catArticles, setCatArticles] = useState([]);

    console.log(articles);

    // const result = []
    // let i = 0;

    // do {

    //     setCatArticles(articles[i])
    //     i++;

    // } while (i < 5);
    // console.log(catArticles)

    let count = 0;
    console.log(count)

    return (
        <>
        <Layout>
            <Hero />

            <div className='row row-gap-5'>
                <div className="col-sm-12 col-md-8">
                    {/* <!-- featured --> */}
                    <section className="featured">
                        {(articles.length > 0 && !loading) && articles.map(article => {
                            if (article.is_featured == true) {
                                return (
                                    <article className="" key={article.id}>
                                        <a href="#" className="text-dark d-block">
                                            <div>
                                                <img src={'http://localhost:8000/' + article.image} alt="" className="d-block" />
                                            </div>

                                            <div style={{marginTop: '-1em'}}>
                                                <h2 className="d-inline px-2 py-1 fs-6 text-white" style={{backgroundColor: 'rebeccapurple'}}><span>{article.category.title} {formatDistanceToNow(new Date(article.created_at))} ago</span></h2>
                                                <p className="px-2 fs-2"><span>{article.title}</span></p>
                                            </div>
                                        </a>
                                    </article>
                                )
                            }
                        })}
                    </section>
                    {/* <!-- end featured --> */}
                    
                    {/* <!-- categories --> */}
                    <section className="categories">
                        <div className="mt-5">
                            <header className="row align-items-center">
                                <h2 className="col-3 fs-6">Girl Power</h2>
                                <span className="d-block col-8 w-70" style={{height: '1.25px', backgroundColor: 'rebeccapurple'}}></span>
                            </header>
                            <div className="articles row">
                                {/* {
                                    let result = '';
                                    let i = 0;

                                    do {
                                    i = i + 1;
                                    result = result + i;
                                    } while (i < 5);
                                } */}
                                {/* { articles.map((article, index) => 
                                    // <ObjectRow obj={ obj } key={ index }/> ) 
                                    return (
                                        <p key={ index }>{article.title}</p>
                                    )
                                } */}
                                {/* <div className="col-md-6">
                                    <article className="border-bottom py-1">
                                        <div className="card rounded-0 text-bg-dark">
                                            <img src={'http://localhost:8000/' + articles[0].image} className="card-img" alt="..." />
                                            <div className="card-img-overlay d-flex flex-column justify-content-end">
                                                <h3 className="card-title fs-2">{articles[0].title}</h3>
                                            </div>
                                        </div>
                                    </article>
                                </div> */}
                                <div className="col-md-6">
                                    {(articles.length > 0 && !loading) && 
                                    // articles.filter(article => article != articles[0].map(filteredArticle => {
                                    //         <article className="row border-bottom py-1">
                                    //             <img src="../images/BingWallpaper(10).jpg" alt="" className="col-3 d-block" />
                                    //             <h3 className="col-8 card-title fs-6">Barbie: The Perfect Gateway To Original Content</h3>
                                    //         </article>
                                    //     })
                                            
                                            
                                    // )}
                                        articles.filter(article => article != articles[0]).map(filteredArticle => (
                                            <article className="row border-bottom py-1" key={filteredArticle.id}>
                                                <img src={'http://localhost:8000/' + filteredArticle.image} alt="" className="col-3 d-block" />
                                                <h3 className="col-8 card-title fs-6">{filteredArticle.title}</h3>
                                            </article>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <!-- end categories --> */}
                </div>

                <Aside />
            </div>

        </Layout>
        </>
    )
}
