import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import swal from 'sweetalert2';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { route } from '../routes';

const baseURL = 'http://127.0.0.1:8000/api'

const useAxios = () => {
    const {authTokens, setUser, setAuthTokens} = useContext(AuthContext);
    const navigate = useNavigate();

    const axiosInstance = axios.create({
        baseURL, 
        headers: {
            'Authorization': `Bearer ${authTokens?.access}`,
            // 'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded', 
            // "Content-Type": "multipart/form-data",
            // 'Content-Type': 'application/form-data',
            // 'Content-Type': 'text/plain',
            // 'Accept': 'application/json',
        },
    });

    axiosInstance.interceptors.request.use(async req => {
        const user = jwtDecode(authTokens.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) return req;

        const response = await axios.post(`${baseURL}/auth/token/refresh/`, {
            refresh: authTokens.refresh
        });

        localStorage.setItem('authTokens', JSON.stringify(response.data))

        setAuthTokens(response.data);
        setUser(jwtDecode(response.data.access));

        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
    });


    // axiosInstance.interceptors.response.use(async (response) => {

    //     // if (response.status === 401) {
    //     //     console.log("You are not authorized");
    //     //     swal.fire({
    //     //         title: 'You are not logged in!',
    //     //         icon: 'error',
    //     //         toast: true,
    //     //         timer: 6000,
    //     //         position: 'top-right',
    //     //         timerProgressBar: true,
    //     //         showConfirmButton: false,
    //     //     })
    //     //     navigate(route('login'))
    //     // }

    //     return response;
    // }, 
    // (error) => {
    //     // if (error.response && error.response.data) {
    //     //     return Promise.reject(error.response.data);
    //     // }

    //     // return Promise.reject(error.message);

    //     if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
    //         swal.fire({
    //             title: 'You are not logged in!',
    //             icon: 'error',
    //             toast: true,
    //             timer: 6000,
    //             position: 'top-right',
    //             timerProgressBar: true,
    //             showConfirmButton: false,
    //         })
    //         navigate(route('login'))
    //     };
    // });

    return axiosInstance;
}

export default useAxios;