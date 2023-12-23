import '../../assets/auth.css'


export default function Layout({children}) {
    return (
        <div className="d-flex align-items-center py-4 bg-body-tertiary">
            <main className="form-signin w-100 m-auto">
                {children}
            </main>
        </div>
    )
}
