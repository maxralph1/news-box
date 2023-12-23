import Header from './Header'
import SideBar from './SideBar'
import '../../assets/dashboard.css'
import '../../assets/dashboard2.css'


export default function Layout({children}) {
    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <SideBar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}
