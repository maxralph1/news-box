import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { route } from '../routes'; 
import swal from 'sweetalert2';
import axios from 'axios'; 
import useAxios from '../utils/useAxios';

export function useArticle(id = null) {
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
            getArticle(id, { signal: controller.signal });
            return () => controller.abort()
        }
    }, [id])

    async function createArticle(article) {
        setLoading(true)
        setErrors({})
        console.log(article)

        return axiosInstance.post('posts/articles/', article, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(() => navigate(route('dashboard.articles.index')))
            .catch(error => {
                if (error.response) {
                    setErrors(error.response)
                    swalUnauthAlert(error)
                }
            })
            .finally(() => setLoading(false))
    }

    async function getArticle(id, { signal } = {}) {
        setLoading(true)

        return axios.get(`articles/${id}`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false))
    }

    async function updateArticle(article) {
        setLoading(true)
        setErrors({})

        return axios.put(`articles/${article.id}`, article)
            .then(() => navigate(route('articles.index')))
            .catch(error => {
                if (error.response) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setLoading(false))
    }

    async function destroyArticle(article) {
        return axios.delete(`articles/${article.id}`)
    }

    return {
        article: { data, setData, errors, loading }, 
        createArticle, 
        updateArticle, 
        destroyArticle, 
    }
}