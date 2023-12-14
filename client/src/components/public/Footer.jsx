export default function Footer() {
    return (
        // <!-- footer -->
        <footer className="mt-5">
            <section className="d-flex flex-column align-items-center py-3 px-5 text-center">
                <div className="">
                    <span className="">NewsBox</span> | 
                    <span className="">Your Cultures. Your Inbox. Every Day</span>
                </div>
                <div className="mt-3">
                    <p>Build your custom Culturess Daily email newsletter with news and analysis on Culturess and all your favorite sports teams, TV shows, and more.</p>
                </div>
                <div>
                    <form action="" method="post" className="d-flex flex-column row-gap-2">
                        <input type="text" className="py-1 px-5" style={{border: "1px solid #494049"}} />
                        <button type="submit" className="py-1 px-5 text-light" style={{background: "#330033"}}>Sign up, it's FREE</button>
                    </form>
                </div>
            </section>

            <section className="mt-4 py-4 px-5 text-light row" style={{background: "#792879"}}>
                <div className="col-md-1">
                    <h4>About</h4>
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Openings</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="col-md-2">
                    <h4>Stay Connected</h4>
                    <ul>
                        <li><a href="#">Our 300+ Sites</a></li>
                        <li><a href="#">Mobile Apps</a></li>
                        <li><a href="#">FanSided Daily</a></li>
                        <li><a href="#">Pitch a Story</a></li>
                    </ul>
                </div>
                <div className="col-md-3">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Use</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                        <li><a href="#">Legal Disclaimer</a></li>
                        <li><a href="#">Accessibility Statement</a></li>
                        <li><a href="#">EU Data Subject Requests</a></li>
                        <li><a href="#">Cookie Settings</a></li>
                    </ul>
                </div>

                <div className="col-md-5">
                    <h4>Download our Mobile Apps</h4>
                    <p>Your favorite teams, topics, and players all on your favorite mobile devices.</p>
                    <div>
                        <ul>
                            <li><img src="#" alt="Apple App Store icon" /></li>
                            <li><img src="#" alt="Google App Store icon" /></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="pb-4 px-5 text-light text-center" style={{background: "#792879"}}>
                <p>&copy; 2023 Minute Media - All Rights Reserved. The content on this site is for entertainment and educational purposes only.
                All betting content is intended for an audience ages 21+. All advice, including picks and predictions, is based on
                individual commentators’ opinions and not that of Minute Media or its related brands. All picks and predictions are
                suggestions only. No one should expect to make money from the picks and predictions discussed on this website. For more
                information, please read our Legal Disclaimer. If you or someone you know has a gambling problem, <a href="tel:1-800-GAMBLER">call 1-800-GAMBLER</a>.</p>
            </section>
        </footer>
        // <!-- end footer -->
    )
}
