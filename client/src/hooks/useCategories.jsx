import { useState, useEffect } from 'react';
// import axiosInstance from '../utils/axios';
import axios from 'axios';


export function useCategories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getCategories({ signal: controller.signal });
        return () => { controller.abort() }
    }, []);

    async function getCategories({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/posts/categories/', { signal })
        // return axiosInstance.get('posts/categories/', { signal })
            .then(response => setCategories(response.data))
            .catch(() => {});
    }

    return { categories, getCategories }
}
