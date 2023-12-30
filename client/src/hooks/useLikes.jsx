import { useState, useEffect } from 'react';
import axios from 'axios';


export function useLikes() {
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getLikes({ signal: controller.signal });
        return () => { controller.abort() }
    }, []);

    async function getLikes({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/posts/likes/', { signal })
            .then(response => setLikes(response.data))
            .catch(() => {});
    }

    return { likes, getLikes }
}
