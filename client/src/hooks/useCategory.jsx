import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from '../utils/axios';
import axios from 'axios'
import useAxios from '../utils/useAxios'
import { route } from '../routes';


export function useCategory(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const api = useAxios();

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
        return api.post('posts/categories/', {
            title: category.title,
            description: category.description,
        })
            .then(() => navigate(route('dashboard.categories.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response.data.errors);
            })
            .finally(() => setLoading(false));
    }

    async function getCategory(id, { signal } = {}) {
        setLoading(true);

        return axios.get(`categories/${id}/`, { signal })
            .then(response => setData(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    async function updateCategory(category) {
        setLoading(true);
        setErrors({});

        return axios.put(`categories/${category.id}/`, category)
            .then(() => navigate(route('categories.index')))
            .catch(error => {
                console.log(error);
                setErrors(error.response.data.errors);
            })
            .finally(() => setLoading(false));
    }

    async function destroyCategory(category) {
        return axios.delete(`categories/${category.id}/`)
    }

    return {
        category: { data, setData, errors, loading },
        createCategory, 
        updateCategory, 
        destroyCategory
    }
}
