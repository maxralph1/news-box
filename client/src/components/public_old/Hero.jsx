import { useArticles } from '../../hooks/useArticles';

export default function Hero() {
    const { articles, error, loading, getArticles } = useArticles();

    return (
        // <!-- hero -->
        <section className="articles hero mb-5">
            {/* <!-- mobile --> */}
            <div id="carouselExampleCaptions" className="carousel slide d-block d-md-none" data-bs-ride="carousel">
                <section className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"
                        aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                        aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                        aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"
                        aria-label="Slide 4"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4"
                        aria-label="Slide 5"></button>
                </section>
                <section className="carousel-inner">
                    {(articles.length > 0 && !loading) && articles.map(article => {
                        if (article.is_gallery == true) {
                            return (
                                <article className="carousel-item active" key={article.id}>
                                    <img src={'http://localhost:8000/' + article.image} className="d-block w-100" alt="..." />
                                    <div className="carousel-caption d-flex flex-column justify-content-end align-items-start">
                                        <h5 className="text-start text-uppercase fs-6 px-2" style={{backgroundColor: '#ffebcd', color: '#330033'}}>{article.category.title}</h5>
                                        <p className="text-start mb-0">{article.title}</p>
                                        <p className="text-start fs-6 fw-light">by {article.added_by.first_name} {article.added_by.last_name}</p>
                                    </div>
                                </article>
                            )
                        }
                    })}
                </section>
            </div>
            {/* <!-- end mobile --> */}

            {/* <!-- desktop --> */}
            <div className="desktop">
                <article className="article-1">
                    <div className="card rounded-0 text-bg-dark">
                        <img src="../images/BingWallpaper(10).jpg" className="card-img rounded-0 d-block" alt="..." />
                        <div className="card-img-overlay d-flex flex-column justify-content-end align-items-start">
                            <h5 className="card-title text-start text-uppercase fs-6 px-2"
                                style={{backgroundColor: '#ffebcd', color: '#330033'}}>Lifestyle
                            </h5>
                            <p className="card-text text-start mb-0">Some representative placeholder content for the first slide.</p>
                            <p className="card-text text-start fs-6 fw-light">by Lindsay Press</p>
                        </div>
                    </div>
                </article>
                <article className="article-2">
                    <div className="card rounded-0 text-bg-dark">
                        <img src="../images/BingWallpaper(10).jpg" className="card-img rounded-0 d-block" alt="..." />
                        <div className="card-img-overlay d-flex flex-column justify-content-end align-items-start">
                            <h5 className="card-title text-start text-uppercase fs-6 px-2"
                                style={{backgroundColor: '#ffebcd', color: '#330033'}}>Lifestyle
                            </h5>
                            <p className="card-text text-start mb-0">Some representative placeholder content for the first slide.</p>
                            <p className="card-text text-start fs-6 fw-light">by Lindsay Press</p>
                        </div>
                    </div>
                </article>
                <article className="article-3">
                    <div className="card rounded-0 text-bg-dark">
                        <img src="../images/BingWallpaper(10).jpg" className="card-img rounded-0 d-block" alt="..." />
                        <div className="card-img-overlay d-flex flex-column justify-content-end align-items-start">
                            <h5 className="card-title text-start text-uppercase fs-6 px-2"
                                style={{backgroundColor: '#ffebcd', color: '#330033'}}>Lifestyle
                            </h5>
                            <p className="card-text text-start mb-0">Some representative placeholder content for the first slide.</p>
                            <p className="card-text text-start fs-6 fw-light">by Lindsay Press</p>
                        </div>
                    </div>
                </article>
                <article className="article-4">
                    <div className="card rounded-0 text-bg-dark">
                        <img src="../images/BingWallpaper(10).jpg" className="card-img rounded-0 d-block" alt="..." />
                        <div className="card-img-overlay d-flex flex-column justify-content-end align-items-start">
                            <h5 className="card-title text-start text-uppercase fs-6 px-2"
                                style={{backgroundColor: '#ffebcd', color: '#330033'}}>Lifestyle
                            </h5>
                            <p className="card-text text-start mb-0">Some representative placeholder content for the first slide.</p>
                            <p className="card-text text-start fs-6 fw-light">by Lindsay Press</p>
                        </div>
                    </div>
                </article>
                <article className="article-5">
                    <div className="card rounded-0 text-bg-dark">
                        <img src="../images/BingWallpaper(10).jpg" className="card-img rounded-0 d-block" alt="..." />
                        <div className="card-img-overlay d-flex flex-column justify-content-end align-items-start">
                            <h5 className="card-title text-start text-uppercase fs-6 px-2"
                                style={{backgroundColor: '#ffebcd', color: '#330033'}}>Lifestyle
                            </h5>
                            <p className="card-text text-start mb-0">Some representative placeholder content for the first slide.</p>
                            <p className="card-text text-start fs-6 fw-light">by Lindsay Press</p>
                        </div>
                    </div>
                </article>
            </div>
            {/* <!-- end desktop --> */}
        </section>
        // <!-- end hero -->
    )
}
