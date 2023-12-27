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

    // async function createAuthor(author) {
    //     setLoading(true)
    //     setErrors({})
    //     console.log(author)

    //     return axiosInstance.post('accounts/authors/', author, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         },
    //     })
    //         .then(() => navigate(route('dashboard.authors.index')))
    //         .catch(error => {
    //             if (error.response) {
    //                 setErrors(error.response)
    //                 swalUnauthAlert(error)
    //             }
    //         })
    //         .finally(() => setLoading(false))
    // }

    async function getAuthor(id, { signal } = {}) {
        setLoading(true)

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/accounts/authors/${id}/`);
            if (!response.ok) {
                throw new Error(
                    `This is an HTTP error: The status is ${response.status}`
                );
            }
            let actualData = await response.json()
            setData(actualData);
            console.log(actualData);
            setErrors(null)
        } catch (err) {
            setErrors(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }

    async function updateAuthor(author) {
        setLoading(true)
        setErrors({})

        return axiosInstance.put(`accounts/authors/${author.username}/`, author)
            .then(() => navigate(route('dashboard.authors.index')))
            .catch(error => {
                if (error.response) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setLoading(false))
    }

    async function destroyAuthor(author) {
        return axiosInstance.delete(`accounts/authors/${author.username}/`)
    }

    return {
        author: { data, setData, errors, loading }, 
        // createAuthor, 
        updateAuthor, 
        destroyAuthor, 
    }
}