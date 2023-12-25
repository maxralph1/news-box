import { formatDistanceToNow, formatRFC7231, intlFormat } from 'date-fns';
import { useArticles } from '../../hooks/useArticles';


export default function Hero() {
    const { articles, error, loading, getArticles } = useArticles();

    return (
        <section className="hero mt-5">
            <h2 className="d-none">Featured Section</h2>
            <div className="row row-gap-4">
                {(articles.length > 0 && !loading) ? articles.map(article => {
                    if (article.is_featured == true) {
                        return (
                            <section className="col-sm-12 col-lg-8">
                                <div className="card text-bg-dark rounded-0 border-0 shadow-lg" key={article.id}>
                                    <img src={'http://localhost:8000/' + article.image} className="card-img rounded-0" alt="..." />
                                    <div className="card-img-overlay d-flex flex-column justify-content-end">
                                        <h3 className="card-title fs-5 fw-semibold p-1 align-self-start" style={{backgroundColor: 'blueviolet'}}>Books</h3>
                                        <p className="card-text fs-3 fw-semibold" style={{textShadow: '.2px .2px 1px black'}}>{article.title}</p>
                                        <p className="card-text fs-5 fw-semibold" style={{textShadow: '.2px .2px 1px black'}}><small>by @{article.added_by} |
                                        {intlFormat(new Date(article.created_at), {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                        </small></p>
                                    </div>
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
                
                <aside className="col-sm-12 col-lg-4 d-flex flex-column">
                    {(articles.length > 0 && !loading) ? articles.map(article => {
                        if (article.is_gallery == true) {
                            return (
                                <div className="card mb-3 shadow-lg rounded-0 border-0" key={article.id}>
                                    <div className="card-body">
                                        <h3 className="card-title fs-6 fw-semibold" style={{color: 'blueviolet'}}>Books</h3>
                                        <p className="card-text fw-semibold">{article.title}</p>
                                        <p className="card-text fw-semibold text-secondary fs-6">by @{article.added_by} | {intlFormat(new Date(article.created_at), {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}</p>
                                    </div>
                                </div>
                            )
                        }
                    }) : (
                        <div className="d-flex justify-content-center my-5">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </section>
    )
}
