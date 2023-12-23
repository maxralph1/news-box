import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { route } from '../routes';
import axios from 'axios';

export function useSubCategory(id = null) {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id !== null) {
            const controller = new AbortController();
            getSubCategory(id, { signal: controller.signal });
            return () => controller.abort()
        }
    }, [id])

    async function createSubCategory(subCategory) {
        setLoading(true)
        setErrors({})

        return axios.post('http://127.0.0.1:8000/api/posts/sub-categories/', subCategory)
            .then(() => navigate(route('sub-categories.index')))
            .catch(error => {
                if (error.response) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setLoading(false))
    }

    async function getSubCategory(id) {
        setLoading(true)

        // return axios.get(`http://127.0.0.1:8000/api/posts/sub-categories/${id}/`, { signal })
        //     .then(response => setData(response.data))
        //     .catch(() => {})
        //     .finally(() => setLoading(false))

        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/posts/sub-categories/${id}/`
            );
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

    async function updateSubCategory(subCategory) {
        setLoading(true)
        setErrors({})

        return axios.put(`http://127.0.0.1:8000/api/posts/sub-categories/${subCategory.id}/`, subCategory)
            .then(() => navigate(route('sub-categories.index')))
            .catch(error => {
                if (error.response) {
                    setErrors(error.response.data.errors)
                }
            })
            .finally(() => setLoading(false))
    }

    async function destroySubCategory(subCategory) {
        return axios.delete(`http://127.0.0.1:8000/api/posts/sub-categories/${subCategory.id}/`)
    }

    return {
        subCategory: { data, setData, errors, loading }, 
        createSubCategory, 
        updateSubCategory, 
        destroySubCategory, 
    }
}