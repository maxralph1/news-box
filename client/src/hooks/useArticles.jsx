import { useState, useEffect } from 'react';
// import axiosInstance from '../utils/axios';
import axios from 'axios';


export function useArticles() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getArticles({ signal: controller.signal });
        return () => { controller.abort() }
    }, []);

    async function getArticles({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/posts/articles/', { signal })
        // return axiosInstance.get('posts/articles/', { signal })
            .then(response => setArticles(response.data))
            .catch(() => {});
    }

    return { articles, getArticles }
}
