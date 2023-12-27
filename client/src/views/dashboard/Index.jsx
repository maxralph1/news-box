import { Link } from 'react-router-dom';
import { route } from '../../routes';
import { useCategories } from '../../hooks/useCategories';
import { useSubCategories } from '../../hooks/useSubCategories';
import { useArticles } from '../../hooks/useArticles';
import { useAuthors } from '../../hooks/useAuthors';
// import { useCategory } from '../../hooks/useCategory';
import Layout from '../../components/dashboard/Layout';


export default function Index() {
  const { categories, getCategories } = useCategories();
  const { subCategories,  getSubCategories } = useSubCategories();
  const { articles, getArticles } = useArticles();
  const { authors, getAuthors } = useAuthors();
  // const { users, getUsers } = useUsers();

  console.log(categories);
  console.log(subCategories);
  console.log(articles);
  // console.log(users);

  return (
    <Layout>
      <h2 className='my-4 fw-bold' style={{color: 'blueviolet'}}>Home</h2>

      <div className="row mb-4">
        <div className="col-sm-6 col-md-3 mb-3">
          <Link to={route('dashboard.articles.index')}>
            <div className="card rounded-0 shadow">
              <div className="card-body">
                <h3 className="card-title fs-5">Total Articles</h3>
                <p className="card-text fw-semibold">{articles.length}</p>
                {/* <p className='card-text'>200 from this week</p> */}
              </div>
            </div>
          </Link>
          
        </div>
        <div className="col-sm-6 col-md-3 mb-3">
          <Link to={route('dashboard.categories.index')}>
            <div className="card rounded-0 shadow">
              <div className="card-body">
                <h3 className="card-title fs-5">Total Categories</h3>
                <p className="card-text fw-semibold">{categories.length}</p>
                {/* <p className='card-text'>200 from this week</p> */}
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-6 col-md-3 mb-3">
          <Link to={route('dashboard.sub-categories.index')}>
            <div className="card rounded-0 shadow">
              <div className="card-body">
                <h3 className="card-title fs-5">Total Sub-categories</h3>
                <p className="card-text fw-semibold">{subCategories.length}</p>
                {/* <p className='card-text'>200 from this week</p> */}
              </div>
            </div>
          </Link>
        </div>
        <div className="col-sm-6 col-md-3">
          <Link to={route('dashboard.authors.index')}>
            <div className="card rounded-0 shadow">
              <div className="card-body">
                <h3 className="card-title fs-5">Total Authors</h3>
                <p className="card-text fw-semibold">{authors.length}</p>
                {/* <p className='card-text'>200 from this week</p> */}
              </div>
            </div>
          </Link>
          
        </div>
      </div>

      <section className='mb-5'>
        <div className="card w-100 rounded-0 shadow">
          <div className="card-header">
            <h3 className='fs-4 fw-bold' style={{color: 'blueviolet'}}>Recent Articles</h3>
          </div>
          <ul className="list-group list-group-flush">
            {(articles.length > 0) ? articles.slice(0,5).map(article => {
              return (
                <Link to={route('dashboard.articles.show', { id: article.id })}>
                  <li key={article.id} className="list-group-item">
                    <h4 className='fw-bold fs-5'>{article.title.substring(0, 25)}</h4>
                    <p dangerouslySetInnerHTML={{ __html: article.body.substring(0, 100) }}></p>
                    <div className='d-flex gap-3'>
                      <span>{article.comments.length}&nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-text" viewBox="0 0 16 16">
                          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                          <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                        </svg>&nbsp;
                        {(article.comments.length > 0) ? 'comments' : 'comment'}
                      </span>
                      <span>{article.likes.length}&nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                          <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                        </svg>&nbsp;
                        {(article.likes.length > 0) ? 'likes' : 'like'}
                      </span>
                    </div>
                  </li>
                </Link>
              )
              
            }) : (
              <div className="d-flex justify-content-center my-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
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
        <div className="card w-100 rounded-0 shadow">
          <div className="card-header">
            <h3 className='fs-4 fw-bold' style={{color: 'blueviolet'}}>Recent Categories</h3>
          </div>
          <ul className="list-group list-group-flush">
            {(categories.length > 0) ? categories.slice(0,5).map(category => {
              return (
                <Link to={route('dashboard.categories.show', { id: category.id })}>
                  <li key={category.id} className="list-group-item">
                    <h4 className='fw-bold fs-5'>{category.title.substring(0, 25)}</h4>
                    <p>{category.description.substring(0, 50)}</p>
                  </li>
                </Link>
              )
              
            }) : (
              <div className="d-flex justify-content-center my-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </ul>
        </div>
      </section>

      <section className='mb-5'>
        <div className="card w-100 rounded-0 shadow">
          <div className="card-header">
            <h3 className='fs-4 fw-bold' style={{color: 'blueviolet'}}>Recent Sub-Categories</h3>
          </div>
          <ul className="list-group list-group-flush">
            {(subCategories.length > 0) ? subCategories.slice(0,5).map(subCategory => {
              return (
                <Link to={route('dashboard.sub-categories.show', { id: subCategory.id })}>
                  <li key={subCategory.id} className="list-group-item">
                    <h4 className='fw-bold fs-5'>{subCategory.title.substring(0, 25)}</h4>
                    <p>{subCategory.description.substring(0, 50)}</p>
                  </li>
                </Link>
                
              )
              
            }) : (
              <div className="d-flex justify-content-center my-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </ul>
        </div>
      </section>

      <section className='mb-5'>
        <div className="card w-100 rounded-0 shadow">
          <div className="card-header">
            <h3 className='fs-4 fw-bold' style={{color: 'blueviolet'}}>Recent Authors</h3>
          </div>
          <ul className="list-group list-group-flush">
            {(authors.length > 0) ? authors.slice(0,5).map(author => {
              if (author.username != 'admin') {
                return (
                  <Link to={route('dashboard.authors.show', { id: author.username })}>
                    <li key={author.id} className="list-group-item">
                      <h4 className='fw-bold fs-5'>{author.first_name + ' ' + author.last_name}</h4>
                      <p>{author.bio ? author.bio : '(Author has no bio yet)'}</p>
                    </li>
                  </Link>
                )
              }
            }) : (
              <div className="d-flex justify-content-center my-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </ul>
        </div>
      </section>
      
    </Layout>
  )
}
