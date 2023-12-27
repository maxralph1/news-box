import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import { route } from '../routes';
import axios from 'axios'
import useAxios from '../utils/useAxios'


export function useCategory(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const swalUnauthAlert = (error) => {
        if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
            swal.fire({
                title: 'You are not logged in!',
                icon: 'error',
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
            navigate(route('login'))
        }
    }

    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getCategory(id, { signal: controller.signal })
            return () => controller.abort();
        }
    }, [id]);

    async function createCategory(category) {
        setLoading(true);
        setErrors({});

        console.log(category)
        return axiosInstance.post('posts/categories/', category)
            .then(() => navigate(route('dashboard.categories.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response.data.errors);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function getCategory(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`http://127.0.0.1:8000/api/posts/categories/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateCategory(category) {
        setLoading(true);
        setErrors({});

        return axiosInstance.put(`posts/categories/${category.id}/`, category)
            .then(() => navigate(route('dashboard.categories.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response);
                swalUnauthAlert(error);
            })
            .finally(() => setLoading(false));
    }

    async function destroyCategory(category) {
        return axiosInstance.delete(`posts/categories/${category.id}/`)
    }

    return {
        category: { data, setData, errors, loading }, 
        getCategory, 
        createCategory, 
        updateCategory, 
        destroyCategory
    }
}
