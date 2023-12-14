import { Link } from 'react-router-dom';
import { route } from '../../routes';
import { useCategories } from '../../hooks/useCategories';
import { useCategory } from '../../hooks/useCategory';
import Layout from '../../components/public/Layout.jsx';


export default function Index() {
  const { categories, error, loading, getCategories } = useCategories();
  const {destroyCategory, errors } = useCategory();

  console.log(categories);

  return (
    <div>
      <Layout>
        <h1>Heading</h1>
        {(categories.length > 0 && !loading) ? categories.map(category => {
          return (
            <div key={category.id}>
            <p>{category.title}</p>
            <p>{category.description}</p>
          </div>
          )
          
        }) : (
          <>
            <p>Loading...</p>
          </>
        )}
      </Layout>
      
    </div>
  )
}
