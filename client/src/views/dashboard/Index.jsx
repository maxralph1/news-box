import { Link } from 'react-router-dom';
import { route } from '../../routes';
import { useCategories } from '../../hooks/useCategories';
import { useSubCategories } from '../../hooks/useSubCategories';
import { useArticles } from '../../hooks/useArticles';
// import { useCategory } from '../../hooks/useCategory';
import Layout from '../../components/dashboard/Layout';


export default function Index() {
  const { categories, getCategories } = useCategories();
  const { subCategories,  getSubCategories } = useSubCategories();
  const { articles, getArticles } = useArticles();
  // const { users, getUsers } = useUsers();

  console.log(categories);
  console.log(subCategories);
  console.log(articles);
  // console.log(users);

  return (
    <Layout>
      <h2 className='my-4'>Home</h2>

      <div className="row mb-4">
        <div className="col-sm-6 col-md-3 mb-3">
          <Link to={route('dashboard.articles.index')}>
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title fs-5">Total Articles</h3>
                <p className="card-text fw-semibold">{articles.length}</p>
                <p className='card-text'>200 from this week</p>
              </div>
            </div>
          </Link>
          
        </div>
        <div className="col-sm-6 col-md-3 mb-3">
          <Link to={route('dashboard.categories.index')}>
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title fs-5">Total Categories</h3>
                <p className="card-text fw-semibold">{categories.length}</p>
                <p className='card-text'>200 from this week</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-6 col-md-3 mb-3">
          <Link to={route('dashboard.sub-categories.index')}>
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title fs-5">Total Sub-categories</h3>
                <p className="card-text fw-semibold">{subCategories.length}</p>
                <p className='card-text'>200 from this week</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-6 col-md-3">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title fs-5">Total Authors</h3>
              <p className="card-text fw-semibold">2500</p>
              <p className='card-text'>200 from this week</p>
            </div>
          </div>
        </div>
      </div>

      <section className='mb-5'>
        <div className="card w-100 shadow">
          <div className="card-header">
            <h3>Recent Articles</h3>
          </div>
          <ul className="list-group list-group-flush">
            {(articles.length > 0) ? articles.map(article => {
              return (
                <li key={article.id} className="list-group-item">
                  <h4 className='fw-bold fs-5'>{article.title.substring(0, 25)}</h4>
                  <p dangerouslySetInnerHTML={{ __html: article.body.substring(0, 50) }}></p>
                </li>
              )
              
            }) : (
              <>
                <p>Loading...</p>
              </>
            )}
          </ul>
        </div>
      </section>

      {/* <section>
        <h3>Recent Authors</h3>

        <div>

        </div>
      </section> */}

      <section className='mb-5'>
        <div className="card w-100 shadow">
          <div className="card-header">
            <h3>Recent Categories</h3>
          </div>
          <ul className="list-group list-group-flush">
            {(categories.length > 0) ? categories.map(category => {
              return (
                <li key={category.id} className="list-group-item">
                  <h4 className='fw-bold fs-5'>{category.title.substring(0, 25)}</h4>
                  <p>{category.description.substring(0, 50)}</p>
                </li>
              )
              
            }) : (
              <>
                <p>Loading...</p>
              </>
            )}
          </ul>
        </div>
      </section>

      <section className='mb-5'>
        <div className="card w-100 shadow">
          <div className="card-header">
            <h3>Recent Sub-Categories</h3>
          </div>
          <ul className="list-group list-group-flush">
            {(subCategories.length > 0) ? subCategories.map(subCategory => {
              return (
                <li key={subCategory.id} className="list-group-item">
                  <h4 className='fw-bold fs-5'>{subCategory.title.substring(0, 25)}</h4>
                  <p>{subCategory.description.substring(0, 50)}</p>
                </li>
              )
              
            }) : (
              <>
                <p>Loading...</p>
              </>
            )}
          </ul>
        </div>
      </section>
      
    </Layout>
  )
}
