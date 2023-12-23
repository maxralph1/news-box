import TopBar from './TopBar.jsx';
import NavBar from './NavBar.jsx';
import Footer from './Footer.jsx';
import '../../css/style.css';


export default function Layout({children}) {
    return (
        <>
            <TopBar />
            <NavBar />
            <main className="mb-3 px-5">
                {children}
            </main>
            <Footer />
        </>
    )
}
