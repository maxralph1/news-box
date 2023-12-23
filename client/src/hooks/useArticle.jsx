import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { route } from '../routes';
import axios from 'axios';

export function useArticle(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();

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

        return axios.post('articles', article)
            .then(() => navigate(route('articles.index')))
            .catch(error => {
                if (error.response) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setLoading(false))
    }

    async function getArticle(id, { signal } = {}) {
        setLoading(true)

        return axios.get(`articles/${id}`, { signal })
            .then(response => setData(response.data.data))
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