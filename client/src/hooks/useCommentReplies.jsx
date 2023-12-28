import { useState, useEffect } from 'react';
import axios from 'axios';


export function useCommentReplies() {
    const [commentReplies, setCommentReplies] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        getCommentReplies({ signal: controller.signal });
        return () => { controller.abort() }
    }, []);

    async function getCommentReplies({ signal } = {}) {
        return axios.get('http://127.0.0.1:8000/api/posts/comment-replies/', { signal })
            .then(response => setCommentReplies(response.data))
            .catch(() => {});
    }

    return { commentReplies, getCommentReplies }
}
