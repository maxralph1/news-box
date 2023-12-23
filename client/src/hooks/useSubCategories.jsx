import { useState, useEffect } from 'react';
// import axiosInstance from '../utils/axios';
import axios from 'axios';


export function useSubCategories() {
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getSubCategories({ signal: controller.signal });
        return () => { controller.abort() };
    }, []);

    async function getSubCategories({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/posts/sub-categories/', { signal })
        // return axiosInstance.get(`posts/categories/${category.id}/sub-categories/`, { signal })
            .then(response => setSubCategories(response.data))
            .catch(() => {});
    }

    return { subCategories, getSubCategories }
}
