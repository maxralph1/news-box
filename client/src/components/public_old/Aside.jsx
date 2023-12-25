export default function Aside() {
    return (
        <aside className="col-md-4">
            <h2 className="mt-1">You may also like</h2>
            <section className="featured mt-4">
                <article className="">
                    <a href="#" className="text-dark d-block">
                        <div>
                            <img src="../images/BingWallpaper(10).jpg" alt="" className="d-block" />
                        </div>
            
                        <div style={{marginTop: '-1em'}}>
                            <h2 className="d-inline px-2 py-1 fs-6 text-white" style={{backgroundColor: 'rebeccapurple'}}>Books <span>22h
                                    ago</span></h2>
                            <p className="px-2 fs-5"><span>Never </span>by <span>Jessa Hastings reimagines Peter Pan in a unique
                                    way</span></p>
                        </div>
                    </a>
                </article>
                <article className="">
                    <a href="#" className="text-dark d-block">
                        <div>
                            <img src="../images/BingWallpaper(10).jpg" alt="" className="d-block" />
                        </div>
            
                        <div style={{marginTop: '-1em'}}>
                            <h2 className="d-inline px-2 py-1 fs-6 text-white" style={{backgroundColor: 'rebeccapurple'}}>Books <span>22h
                                    ago</span></h2>
                            <p className="px-2 fs-5"><span>Never </span>by <span>Jessa Hastings reimagines Peter Pan in a unique
                                    way</span></p>
                        </div>
                    </a>
                </article>
            </section>
        </aside>
    )
}
