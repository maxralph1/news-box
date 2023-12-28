import { useState, useEffect } from 'react';
import axios from 'axios';


export function useComments() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getComments({ signal: controller.signal });
        return () => { controller.abort() }
    }, []);

    async function getComments({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/posts/comments/', { signal })
            .then(response => setComments(response.data))
            .catch(() => {});
    }

    return { comments, getComments }
}
