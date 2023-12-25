import { Link } from 'react-router-dom';
import { route } from '../../routes';
import { useCategories } from '../../hooks/useCategories';
import { useSubCategories } from '../../hooks/useSubCategories';
import { useCategory } from '../../hooks/useCategory';

export default function NavBar() {
    const { categories, error, loading, getCategories } = useCategories();
    const { subCategories, getSubCategories } = useSubCategories();
    const {destroyCategory, errors } = useCategory();

    console.log(categories);
    console.log(subCategories);

    return (
        // <!-- navbar -->
        <section className="navbar justify-content-md-center sticky-top d-block min-w-100 mb-0 mb-md-5">
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent" aria-label="Tenth navbar example">
                <div className="container-fluid" style={{background: "#330033"}}>
                    <h2><a className="navbar-brand" href="#">NewsBox</a></h2>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample08"
                        aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                        <img src="../images/angle-small-down.svg" alt="" width="20" className="dropdown-icon" />
                    </button>
            
                    <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
                        <ul className="navbar-nav">
                            {(categories.length > 0 && !loading) ? categories.map(category => {
                                return (
                                    <li key={category.id} className="categories nav-item dropdown">
                                        {(category.sub_categories.length > 0) 
                                            ? <a className="category nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown"
                                            aria-expanded="false">{category.title}</a>
                                            : <a className="category nav-link" href="#" data-bs-toggle="dropdown"
                                            aria-expanded="false">{category.title}</a>}
                                        {(category.sub_categories.length > 0) && 
                                            <ul className="dropdown-menu">
                                                {category.sub_categories.map(subCategory => {
                                                    return (
                                                        <Link
                                                            key={subCategory.id} 
                                                            to={ route('sub-categories.show', { id: subCategory.id }) }
                                                            className="sub-category dropdown-item"
                                                        >
                                                            {subCategory.title}
                                                        </Link>
                                                    )
                                                })}
                                            </ul>
                                        }
                                    </li>
                                )
                            }) : (
                                <>
                                    <p>Loading...</p>
                                </>
                            )}
                        </ul>
                        <ul className="social">
                            <li><a href=""></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </section>
        // <!-- end navbar -->
    )
}
