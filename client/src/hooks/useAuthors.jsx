import { useState, useEffect } from 'react';
// import axiosInstance from '../utils/axios';
import axios from 'axios';


export function useAuthors() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getAuthors({ signal: controller.signal });
        return () => { controller.abort() }
    }, []);

    async function getAuthors({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/posts/authors/', { signal })
        // return axiosInstance.get('posts/authors/', { signal })
            .then(response => setAuthors(response.data))
            .catch(() => {});
    }

    return { authors, getAuthors }
}
