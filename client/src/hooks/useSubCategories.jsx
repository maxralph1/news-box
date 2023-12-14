import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';
// import axios from 'axios';


export function useSubCategories(category = null) {
    const [loading, setLoading] = useState(false);
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        if (category !== null) {
            const controller = new AbortController();
            getSubCategories(category, { signal: controller.signal });
            return () => { controller.abort() };
        }
    }, [id]);

    async function getSubCategories(category, { signal } = {}) {
        // return axios.get('http://127.0.0.1:8000/api/posts/categories/', { signal })
        return axiosInstance.get(`posts/categories/${category.id}/sub-categories/`, { signal })
            .then(response => setSubCategories(response.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }

    return { subCategories, getSubCategories }
}
