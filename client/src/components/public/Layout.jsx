import NavBar from './NavBar';
import Footer from './Footer';
import '../../css/style.css';


export default function Layout({children}) {
    return (
        <>
            <NavBar />

            <main className="container my-5 py-4">
                {children}
            </main>
            
            <Footer />
        </>
    )
}
