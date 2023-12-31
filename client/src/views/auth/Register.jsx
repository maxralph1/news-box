import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { route } from '../../routes';
import Swal from 'sweetalert2';
import AuthContext from '../../context/AuthContext';
import Layout from '../../components/auth/Layout';
import '../../assets/auth.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  let {registerUser} = useContext(AuthContext);

  const handleSubmit = async e => {
      e.preventDefault();
      if (password == password2) {
          registerUser(email, firstname, lastname, username, password)
      } else {
        Swal.fire({
              title: 'Given passwords do not match',
              icon: 'error',
              toast: true,
              timer: 6000,
              position: 'top-right',
              timerProgressBar: true,
              showConfirmButton: false,
          })
      }
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <h2 className="h3 mb-3 fw-normal">Register</h2>

        <div className="form-floating">
          <input 
            name="email" 
            id="email" 
            type="email" 
            className="form-control rounded-0" 
            placeholder="name@example.com" 
            onChange={e => setEmail(e.target.value)} />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input 
            name="username" 
            id="username" 
            type="text" 
            className="form-control rounded-0" 
            placeholder="user123" 
            onChange={e => setUsername(e.target.value)} />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating">
          <input 
            name="firstname" 
            id="firstname" 
            type="text" 
            className="form-control rounded-0" 
            placeholder="John" 
            onChange={e => setFirstname(e.target.value)} />
          <label htmlFor="firstname">First Name</label>
        </div>
        <div className="form-floating">
          <input 
            name="lastname" 
            id="lastname" 
            type="text" 
            className="form-control rounded-0" 
            placeholder="John" 
            onChange={e => setLastname(e.target.value)} />
          <label htmlFor="lastname">Last Name</label>
        </div>
        <div className="form-floating mb-0 pb-0">
          <input 
            name="password" 
            id="password" 
            type="password" 
            className="form-control rounded-0"
            placeholder="Password" 
            onChange={e => setPassword(e.target.value)} />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating mt-0 pt-0">
          <input 
            name="password2" 
            id="password2" 
            type="password" 
            className="form-control rounded-0"
            placeholder="Repeat Password" 
            onChange={e => setPassword2(e.target.value)} />
          <label htmlFor="password">Repeat Password</label>
        </div>

        <button className="btn btn-secondary w-100 py-2 rounded-0" type="submit">Register</button>

        <div className='mt-4'>
            <p className=''>Already have an account?{' '} 
                <Link to={ route('login') } className='fw-semibold' style={{ color: 'blueviolet' }}>Sign In</Link>
            </p>
        </div>

        <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–{new Date().getFullYear()}</p>
      </form>
    </Layout>
  )
}
