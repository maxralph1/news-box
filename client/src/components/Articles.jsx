import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useInfiniteScroll from '../hooks/useInfiniteScroll'
import { useSubCategory } from '../hooks/useSubCategory'

const Article = () => {
    const params = useParams()
    const { subCategory, updateSubCategory } = useSubCategory(params.id)
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreArticleItems);
    const [articleItems, setArticleItems] = useState(subCategory.data.articles);
    console.log(subCategory.data.articles)
    // console.log(articleItems)
    

    function fetchMoreArticleItems() {
        setTimeout(() => {
            setArticleItems(subCategory.data.articles);
            setIsFetching(false);
        }, 2000);
    }

    return (
        <>
        <ul className="article-group mb-2 d-flex flex-column flex-wrap">
            {subCategory.data.articles?.length > 0 && subCategory.data.articles.map(articleItem => {
                return (
                        // <li className="article-group-item">Article Item {articleItem.body}</li>
                        <li dangerouslySetInnerHTML={{ __html: articleItem.body }}></li>
                    )
                }
            )}
        </ul>
        {isFetching && 'Fetching more article items...'}
        </>
    );
};

export default Article;