import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import { route } from '../routes'; 
import axios from 'axios'; 
import useAxios from '../utils/useAxios';

export function useAuthor(id = null) {
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
            getAuthor(id, { signal: controller.signal });
            return () => controller.abort()
        }
    }, [id])

    async function createAuthor(author) {
        setLoading(true)
        setErrors({})
        console.log(author)

        return axiosInstance.post('accounts/authors/', author, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(() => navigate(route('dashboard.authors.index')))
            .catch(error => {
                if (error.response) {
                    setErrors(error.response)
                    swalUnauthAlert(error)
                }
            })
            .finally(() => setLoading(false))
    }

    async function getAuthor(id, { signal } = {}) {
        setLoading(true)

        return axios.get(`http://127.0.0.1:8000/api/accounts/authors/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }

    async function updateAuthor(author) {
        setLoading(true)
        setErrors({})

        return axios.put(`authors/${author.id}`, author)
            .then(() => navigate(route('authors.index')))
            .catch(error => {
                if (error.response) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setLoading(false))
    }

    async function destroyAuthor(author) {
        return axios.delete(`authors/${author.id}`)
    }

    return {
        author: { data, setData, errors, loading }, 
        createAuthor, 
        updateAuthor, 
        destroyAuthor, 
    }
}