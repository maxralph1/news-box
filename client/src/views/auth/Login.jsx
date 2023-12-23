import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Layout from '../../components/auth/Layout';
import '../../assets/auth.css';


export default function Login() {
  const {loginUser} = useContext(AuthContext);

  const handleSubmit = e => {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;

      username.length > 0 && loginUser(username, password);
  }
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <h2 className="h3 mb-3 fw-normal">Sign In</h2>

        <div className="form-floating">
          <input name="username" id="username" type="text" className="form-control" placeholder="user123" />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating">
          <input name="password" id="password" type="password" className="form-control" placeholder="Password" />
          <label htmlFor="password">Password</label>
        </div>

        <div className="form-check text-start my-3">
          <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Remember me
          </label>
        </div>
        <button className="btn btn-secondary w-100 py-2 rounded-0" type="submit">Sign in</button>

        <div>
            <p className=''>Don't have an account?{' '} 
                <Link to='/register'>Register Now</Link>
            </p>
        </div>

        <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–{new Date().getFullYear()}</p>
      </form>
    </Layout>
  )
}
