import { Routes, Route } from 'react-router-dom';
import { route } from './routes';
// import { AuthProvider } from './context/AuthContext.jsx';
// import PrivateRoute from './utils/PrivateRoute.jsx';
import Home from './views/public/Home.jsx';
import Categories from './views/public/Categories.jsx';
import Category from './views/public/Category.jsx';
import SubCategories from './views/public/SubCategories.jsx'; 
import SubCategory from './views/public/SubCategory.jsx'; 
import Articles from './views/public/Articles.jsx';
import Article from './views/public/Article.jsx';
import Register from './views/auth/Register.jsx';
import Login from './views/auth/Login.jsx';
import Dashboard from './views/dashboard/Index.jsx';
// import Dashboard from './views/Dashboard.jsx';
// import Navbar from './components/Navbar.jsx';
// import './App.css'

function App() {
  return (
    <Routes>

      {/* Public routes */}
      <Route element={<Home />} path={ route('home') } />
      <Route element={<Categories />} path={ route('categories.index') } />
      <Route element={<Category />} path={ route('categories.show') } />
      <Route element={<SubCategories />} path={ route('sub-categories.index') } />
      <Route element={<SubCategory />} path={ route('sub-categories.show') } />
      <Route element={<Articles />} path={ route('articles.index') } />
      <Route element={<Article />} path={ route('articles.show') } />
      <Route element={<Login />} path='/login' />
      <Route element={<Register />} path='/register' />


      {/* Protected routes */}
      {/* <AuthProvider> */}
        {/* <Navbar />  */}
        {/* <Switch> */}
          {/* <PrivateRoute> */}
            
            <Route element={<Dashboard />} path='/dashboard' />
          {/* </PrivateRoute> */}
        {/* </Switch> */}
      {/* </AuthProvider> */}
    </Routes>
  )
}

export default App
