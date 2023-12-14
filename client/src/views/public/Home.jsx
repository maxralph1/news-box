import { Link } from 'react-router-dom';
import { route } from '../../routes';
import Layout from '../../components/public/Layout.jsx';
import Hero from '../../components/public/Hero.jsx';
import Aside from '../../components/public/Aside.jsx';

export default function Home() {
  return (
    <>
      <Layout>
        <Hero />

        <div className='row row-gap-5'>
            <div className="col-sm-12 col-md-8">
                {/* <!-- featured --> */}
                <section className="featured">
                    <article className="">
                        <a href="#" className="text-dark d-block">
                            <div>
                                <img src="../images/BingWallpaper(10).jpg" alt="" className="d-block" />
                            </div>
                
                            <div style={{marginTop: '-1em'}}>
                                <h2 className="d-inline px-2 py-1 fs-6 text-white" style={{backgroundColor: 'rebeccapurple'}}>Books <span>22h
                                        ago</span></h2>
                                <p className="px-2 fs-2"><span>Never </span>by <span>Jessa Hastings reimagines Peter Pan in a unique
                                        way</span></p>
                            </div>
                        </a>
                    </article>
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
                            <div className="col-md-6">
                                <article className="border-bottom py-1">
                                    <div className="card rounded-0 text-bg-dark">
                                        <img src="../images/BingWallpaper(10).jpg" className="card-img" alt="..." />
                                        <div className="card-img-overlay d-flex flex-column justify-content-end">
                                            <h3 className="card-title fs-2">Barbie: The Perfect Gateway To Original Content</h3>
                                        </div>
                                    </div>
                                </article>
                            </div>
                            <div className="col-md-6">
                                <article className="row border-bottom py-1">
                                    <img src="../images/BingWallpaper(10).jpg" alt="" className="col-3 d-block" />
                                    <h3 className="col-8 card-title fs-6">Barbie: The Perfect Gateway To Original Content</h3>
                                </article>
                                <article className="row border-bottom py-1">
                                    <img src="../images/BingWallpaper(10).jpg" alt="" className="col-3 d-block" />
                                    <h3 className="col-8 card-title fs-6">Barbie: The Perfect Gateway To Original Content</h3>
                                </article>
                                <article className="row border-bottom py-1">
                                    <img src="../images/BingWallpaper(10).jpg" alt="" className="col-3 d-block" />
                                    <h3 className="col-8 card-title fs-6">Barbie: The Perfect Gateway To Original Content</h3>
                                </article>
                                <article className="row border-bottom py-1">
                                    <img src="../images/BingWallpaper(10).jpg" alt="" className="col-3 d-block" />
                                    <h3 className="col-8 card-title fs-6">Barbie: The Perfect Gateway To Original Content</h3>
                                </article>
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
