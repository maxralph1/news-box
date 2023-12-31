import { useState, useEffect } from 'react'
 
export function useSearch() {
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});

    const getSearchData = async (query) => {
        setLoading(true)

        try {
        const response = await fetch(`http://127.0.0.1:8000/api/posts/search/?query=${query}}`);
        if (!response.ok) {
            throw new Error(
            `This is an HTTP error: The status is ${response.status}`
            );
        }
        let actualData = await response.json();
        setData(actualData);
        setErrors(null);
        } catch(err) {
            setErrors(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }  
    }

    // useEffect(() => {
    //     getSearchData()
    // }, [query])
    useEffect(() => {
        if (query !== null) {
            const controller = new AbortController();
            getSearchData(query, { signal: controller.signal });
            return () => controller.abort()
        }
    }, [query])
 
    return { 
        search: {data, setData, errors, loading }, 
        getSearchData, 
    }
}