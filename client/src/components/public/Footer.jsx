import footerLogo from '../../assets/images/default.png';

export default function Footer() {
    return (
        <footer className="footer mt-auto pb-3 text-white" style={{backgroundColor: 'blueviolet'}}>
            <div className="container">
                <div className='d-flex justify-content-center border-bottom mb-3 pb-0'>
                    <img src={footerLogo} alt="NewsBox" width='110' />
                </div>
                <ul className="list-style-none mb-3">
                    <li>About</li>
                    <li>Openings</li>
                    <li>Our 300+ Sites</li>
                    <li>Pitch a Story</li>
                    <li>Terms of Use</li>
                    <li>Legal Disclaimer</li>
                    <li>A-Z Index</li>
                    <li>Masthead</li>
                    <li>Contact</li>
                    <li>FanSided Daily</li>
                    <li>Privacy Policy</li>
                    <li>Cookie Policy</li>
                    <li>Accessibility Statement</li>
                    <li>Cookie Preferences</li>
                </ul>
                <p className="text-center fs-6 border-top pt-3">© 2023 Minute Media - All Rights Reserved. The content on this site is for entertainment and educational purposes only. All betting content is intended for an audience ages 21+. All advice, including picks and predictions, is based on individual commentators’ opinions and not that of Minute Media or its related brands. All picks and predictions are suggestions only. No one should expect to make money from the picks and predictions discussed on this website. For more information, please read our Legal Disclaimer. If you or someone you know has a gambling problem, call 1-800-GAMBLER.</p>
            </div>
        </footer>
    )
}
