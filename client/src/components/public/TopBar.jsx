export default function TopBar() {
  return (
    // <!-- top bar -->
    <header className="d-flex justify-content-between align-items-center text-light px-2 pb-0" style={{backgroundColor: "#330033"}}>
        <h1>NewsBox</h1>

        <nav className="d-md-flex justify-content-between align-items-center column-gap-4">
            <ul className="external-links d-none d-md-flex column-gap-3">
                <li><a href="#" className="text-light">fansided.com</a></li>
                <li><a href="#" className="text-light">Our 300+ Fansided Sites</a></li>
            </ul>
            <ul className="accessibility-and-search d-md-flex column-gap-3">
                <li className="accessibility-link"><a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-universal-access"
                        viewBox="0 0 16 16">
                        <path
                            d="M9.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M6 5.5l-4.535-.442A.531.531 0 0 1 1.531 4H14.47a.531.531 0 0 1 .066 1.058L10 5.5V9l.452 6.42a.535.535 0 0 1-1.053.174L8.243 9.97c-.064-.252-.422-.252-.486 0l-1.156 5.624a.535.535 0 0 1-1.053-.174L6 9z" />
                    </svg>
                </a></li>
                <li className="search-link d-none d-md-block"><a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search"
                        viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                </a></li>
            </ul>
        </nav>
    </header>
    // <!-- end top bar -->
  )
}
