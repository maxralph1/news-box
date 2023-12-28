import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import { route } from '../routes';
import useAxios from '../utils/useAxios';


export function useComment(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const axiosInstance = useAxios();

    const swalUnauthAlert = (error) => {
        if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
            swal.fire({
                title: 'You are not logged in!',
                icon: 'error',
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
            navigate(route('login'))
        }
    }

    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getComment(id, { signal: controller.signal });
            return () => controller.abort()
        }
    }, [id])

    async function createComment(body, article) {
        setLoading(true)
        setErrors({})
        console.log(body, article)

        return axiosInstance.post('posts/comments/', {body, article})
            .then()
            .catch(error => {
                if (error.response) {
                    setErrors(error.response)
                    console.log(error.response)
                    swalUnauthAlert(error)
                }
            })
            .finally(() => setLoading(false))
    }

    async function getComment(id) {
        setLoading(true)

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/posts/comments/${id}/`);
            if (!response.ok) {
                throw new Error(
                    `This is an HTTP error: The status is ${response.status}`
                );
            }
            let actualData = await response.json()
            setData(actualData);
            console.log(actualData);
            setErrors(null)
        } catch (err) {
            setErrors(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    }

    async function updateComment(comment) {
        setLoading(true)
        setErrors({})
        console.log(comment)

        return axiosInstance.put(`posts/comments/${comment.id}/`, comment)
            .catch(error => {
                if (error.response) {
                    setErrors(error.response) 
                    swalUnauthAlert(error)
                }
            })
            .finally(() => setLoading(false))
    }

    async function destroyComment(comment) {
        return axiosInstance.delete(`posts/comments/${comment.id}/`)
            .catch(error => {
                if (error.response) {
                    setErrors(error.response) 
                    swalUnauthAlert(error)
                }
            })
            .finally(() => setLoading(false))
    }

    return {
        comment: { data, setData, errors, loading }, 
        createComment, 
        updateComment, 
        destroyComment, 
    }
}