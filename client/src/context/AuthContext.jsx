// import { createContext, useState, useEffect } from 'react';
// import jwt_decode from 'jwt-decode';
// import { useHistory } from 'react-router-dom';
// const sweetAlert = require('sweetalert2');

// const AuthContext = createContext();

// export default AuthContext

// export const AuthProvider = ({ children }) => {
//     const [authTokens, setAuthTokens] = useState(() =>
//         localStorage.getItem('authTokens')
//             ? JSON.parse(localStorage.getItem('authTokens'))
//             : null
//     );
    

//     const [user, setUser] = useState(() => 
//         localStorage.getItem('authTokens')
//             ? jwt_decode(localStorage.getItem('authTokens'))
//             : null
//     );


//     const [loading, setLoading] = useState(true);

//     const history = useHistory();

//     const loginUser = async (email, password) => {
//         const response = await fetch('http://127.0.0.1:8000/api/auth/token/', {
//             method: 'POST',
//             headers:{
//                 'Content-Type':'application/json'
//             },
//             body: JSON.stringify({
//                 email, password
//             })
//         })
//         const data = await response.json()
//         console.log(data);

//         if(response.status === 200){
//             console.log('Logged In');
//             setAuthTokens(data)
//             setUser(jwt_decode(data.access))
//             localStorage.setItem('authTokens', JSON.stringify(data))
//             history.push('/')
//             sweetAlert.fire({
//                 title: 'Login Successful',
//                 icon: 'success',
//                 toast: true,
//                 timer: 6000,
//                 position: 'top-right',
//                 timerProgressBar: true,
//                 showConfirmButton: false,
//             })

//         } else {    
//             console.log(response.status);
//             console.log('there was a server issue');
//             sweetAlert.fire({
//                 title: 'Username or passowrd does not exists',
//                 icon: 'error',
//                 toast: true,
//                 timer: 6000,
//                 position: 'top-right',
//                 timerProgressBar: true,
//                 showConfirmButton: false,
//             })
//         }
//     }

//     const registerUser = async (email, username, first_name, last_name, password, password2) => {
//         const response = await fetch('http://127.0.0.1:8000/api/auth/register/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type':'application/json'
//             },
//             body: JSON.stringify({
//                 email, username, first_name, last_name, password, password2
//             })
//         })
//         if(response.status === 201){
//             history.push('/login')
//             sweetAlert.fire({
//                 title: 'Registration Successful.You can now login',
//                 icon: 'success',
//                 toast: true,
//                 timer: 6000,
//                 position: 'top-right',
//                 timerProgressBar: true,
//                 showConfirmButton: false,
//             })
//         } else {
//             console.log(response.status);
//             console.log('There was a server error');
//             sweetAlert.fire({
//                 title: 'Error: ' + response.status + '!',
//                 icon: 'error',
//                 toast: true,
//                 timer: 6000,
//                 position: 'top-right',
//                 timerProgressBar: true,
//                 showConfirmButton: false,
//             })
//         }
//     }

//     const logoutUser = async () => {
//         const response = await fetch('http://127.0.0.1:8000/api/auth/logout/blacklist/', {
//             method: 'POST',
//             headers:{
//                 'Content-Type':'application/json'
//             },
//             body: JSON.stringify({
//                 refresh_token: localStorage.getItem('refresh_token')
//             })
//         })
//         setAuthTokens(null)
//         setUser(null)
//         localStorage.removeItem('authTokens')
//         history.push('/login')
//         if(response.status === 205){
//             history.push('/login')
//             sweetAlert.fire({
//                 title: 'Logged out.',
//                 icon: 'warning',
//                 toast: true,
//                 timer: 6000,
//                 position: 'top-right',
//                 timerProgressBar: true,
//                 showConfirmButton: false,
//             })
//         } else {
//             console.log(response.status);
//             console.log('We couldn\'t log you out. There was a server error.');
//             sweetAlert.fire({
//                 title: 'Error: ' + response.status + '!',
//                 icon: 'error',
//                 toast: true,
//                 timer: 6000,
//                 position: 'top-right',
//                 timerProgressBar: true,
//                 showConfirmButton: false,
//             })
//         }
//     }

//     const contextData = {
//         user, 
//         setUser,
//         authTokens,
//         setAuthTokens,
//         registerUser,
//         loginUser,
//         logoutUser,
//     }

//     useEffect(() => {
//         if (authTokens) {
//             setUser(jwt_decode(authTokens.access))
//         }
//         setLoading(false)
//     }, [authTokens, loading])

//     return (
//         <AuthContext.Provider value={contextData}>
//             {loading ? null : children}
//         </AuthContext.Provider>
//     )

// }