import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { route } from '../routes';
// import axios from 'axios';
import useAxios from '../utils/useAxios';
import swal from 'sweetalert2';

export function useSubCategory(id = null) {
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
            getSubCategory(id, { signal: controller.signal });
            return () => controller.abort()
        }
    }, [id])

    async function createSubCategory(subCategory) {
        setLoading(true)
        setErrors({})

        return axiosInstance.post('posts/sub-categories/', subCategory)
            .then(() => navigate(route('dashboard.sub-categories.index')))
            .catch(error => {
                if (error.response) {
                    setErrors(error.response)
                    // console.log(error.response)
                    swalUnauthAlert(error)
                }
            })
            .finally(() => setLoading(false))
    }

    async function getSubCategory(id) {
        setLoading(true)

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/posts/sub-categories/${id}/`);
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

    async function updateSubCategory(subCategory) {
        setLoading(true)
        setErrors({})

        return axiosInstance.put(`posts/sub-categories/${subCategory.id}/`, subCategory)
            .then(() => navigate(route('dashboard.sub-categories.index')))
            .catch(error => {
                if (error.response) {
                    setErrors(error.response) 
                    swalUnauthAlert(error)
                }
            })
            .finally(() => setLoading(false))
    }

    async function destroySubCategory(subCategory) {
        return axiosInstance.delete(`posts/sub-categories/${subCategory.id}/`)
            .then(() => navigate(route('dashboard.sub-categories.index')))
            .catch(error => {
                if (error.response) {
                    setErrors(error.response) 
                    swalUnauthAlert(error)
                }
            })
            .finally(() => setLoading(false))
    }

    return {
        subCategory: { data, setData, errors, loading }, 
        createSubCategory, 
        updateSubCategory, 
        destroySubCategory, 
    }
}