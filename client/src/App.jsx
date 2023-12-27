import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { route } from './routes';
import PrivateRoute from './utils/PrivateRoute.jsx';
import Home from './views/public/Home.jsx';
import Categories from './views/public/Categories.jsx';
import Category from './views/public/Category.jsx';
import SubCategories from './views/public/SubCategories.jsx'; 
import SubCategory from './views/public/SubCategory.jsx'; 
import Articles from './views/public/Articles.jsx';
import Article from './views/public/Article.jsx';
import Author from './views/public/Author.jsx';
import Search from './views/public/Search.jsx';
import Register from './views/auth/Register.jsx';
import Login from './views/auth/Login.jsx';
import Dashboard from './views/dashboard/Index.jsx';
import DashboardCategories from './views/dashboard/categories/Categories.jsx';
import DashboardCategoryCreate from './views/dashboard/categories/CreateCategory.jsx';
import DashboardCategory from './views/dashboard/categories/Category.jsx';
import DashboardCategoryEdit from './views/dashboard/categories/EditCategory.jsx';
import DashboardSubCategories from './views/dashboard/sub-categories/SubCategories.jsx'; 
import DashboardSubCategoryCreate from './views/dashboard/sub-categories/CreateSubCategory.jsx';
import DashboardSubCategory from './views/dashboard/sub-categories/SubCategory.jsx'; 
import DashboardSubCategoryEdit from './views/dashboard/sub-categories/EditSubCategory.jsx';
import DashboardArticles from './views/dashboard/articles/Articles.jsx';
import DashboardArticleCreate from './views/dashboard/articles/CreateArticle.jsx';
import DashboardArticle from './views/dashboard/articles/Article.jsx'; 
import DashboardArticleEdit from './views/dashboard/articles/EditArticle.jsx';
import DashboardAuthors from './views/dashboard/authors/Authors.jsx';
import DashboardAuthor from './views/dashboard/authors/Author.jsx';
import DashboardAuthorEdit from './views/dashboard/authors/EditAuthor.jsx';
import Profile from './views/dashboard/profile/Index.jsx';


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* Public routes */}
          <Route element={<Home />} path={ route('home') } />
          <Route element={<Categories />} path={ route('categories.index') } />
          <Route element={<Category />} path={ route('categories.show') } />
          <Route element={<SubCategories />} path={ route('sub-categories.index') } />
          <Route element={<SubCategory />} path={ route('sub-categories.show') } />
          <Route element={<Articles />} path={ route('articles.index') } />
          <Route element={<Article />} path={ route('articles.show') } />
          <Route element={<Author />} path={ route('authors.show') } />
          <Route element={<Search />} path={ route('search') } />
          <Route element={<Login />} path={ route('login') } />
          <Route element={<Register />} path={ route('register') } />

          {/* Protected routes */}
          <Route element={<PrivateRoute/>} path='/' >
            <Route element={<Dashboard/>} path={ route('dashboard') } />
            <Route element={<DashboardCategories/>} path={ route('dashboard.categories.index') } />
            <Route element={<DashboardCategoryCreate/>} path={ route('dashboard.categories.create') } />
            <Route element={<DashboardCategory/>} path={ route('dashboard.categories.show') } />
            <Route element={<DashboardCategoryEdit/>} path={ route('dashboard.categories.edit') } />
            <Route element={<DashboardSubCategories/>} path={ route('dashboard.sub-categories.index') } /> 
            <Route element={<DashboardSubCategoryCreate/>} path={ route('dashboard.sub-categories.create') } />
            <Route element={<DashboardSubCategory/>} path={ route('dashboard.sub-categories.show') } /> 
            <Route element={<DashboardSubCategoryEdit/>} path={ route('dashboard.sub-categories.edit') } />
            <Route element={<DashboardArticles/>} path={ route('dashboard.articles.index') } /> 
            <Route element={<DashboardArticleCreate/>} path={ route('dashboard.articles.create') } /> 
            <Route element={<DashboardArticle/>} path={ route('dashboard.articles.show') } />
            <Route element={<DashboardArticleEdit/>} path={ route('dashboard.articles.edit') } />
            <Route element={<DashboardAuthors/>} path={ route('dashboard.authors.index') } /> 
            <Route element={<DashboardAuthor/>} path={ route('dashboard.authors.show') } />
            <Route element={<DashboardAuthorEdit/>} path={ route('dashboard.authors.edit') } />
            <Route element={<Profile/>} path={ route('dashboard.profile') } />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

