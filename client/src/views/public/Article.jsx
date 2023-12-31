import { useEffect, useState } from 'react'; 
import { Link, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import { route } from '../../routes';
import Layout from '../../components/public/Layout.jsx';
import { useArticle } from '../../hooks/useArticle';
import { useComments } from '../../hooks/useComments';
import { useComment } from '../../hooks/useComment';
import { useCommentReplies } from '../../hooks/useCommentReplies';
import { useCommentReply } from '../../hooks/useCommentReply';
import { useLikes } from '../../hooks/useLikes';
import { useLike } from '../../hooks/useLike';

export default function Article() {
  const params = useParams();
  const { article, getArticle } = useArticle(params.id);
  // console.log(article)
  const { comments, error, loading } = useComments();
  const { comment, createComment } = useComment();
  const { commentReplies } = useCommentReplies();
  const { commentReply, createCommentReply } = useCommentReply();
  const { likes } = useLikes();
  const { like, createLike } = useLike();

  console.log(comments)
  console.log(commentReplies)
  console.log(article.data.comments)

  const submitComment = async e => {
      e.preventDefault();
      const body = e.target.comment_body.value;
      const article = e.target.comment_article.value;

      body.length > 0 && await createComment(body, article);
      await getArticle(params.id);
  }

  const submitCommentReply = async e => {
      e.preventDefault();
      const body = e.target.comment_reply_body.value;
      const comment = e.target.comment_reply_comment.value;

      body.length > 0 && await createCommentReply(body, comment);
      await getArticle(params.id);
  }

  return (
    <Layout>
      <section className="mt-5 pt-3">
        <div className="my-3">
          <h2 className="fw-bolder">{article.data.title}</h2>
          <p className="fs-6 fw-semibold text-secondary">By @
            <span>
              <Link 
                to={ route('authors.show', { id: article.data.added_by }) }
                style={{color: 'blueviolet', textDecoration: 'underline'}}
              >
                {article.data.added_by}
              </Link> | {dayjs(article.data.created_at).format('MMM D, YYYY')}
            </span>
          </p>
          {/* <p className="fs-5 fw-semibold">{article.data.body}</p> */}
        </div>
      </section>

      <section>
        <figure>
          <img className='w-100' src={'http://localhost:8000/' + article.data.image} alt={article.data?.title} />
          <figcaption className='text-secondary'>{article.data?.image_description}</figcaption>
        </figure>
      </section>

      <section>
        <div dangerouslySetInnerHTML={{ __html: article.data.body }}></div>
      </section>

      <section className='likes-and-comments'>
        <div className='d-flex gap-3'>
          <span>
            <a href="#user-comments" className='text-decoration-none text-black'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-text" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
              </svg>&nbsp;
              {article.data.comments?.length}&nbsp;
              {(article.data.comments?.length > 1) ? 'comments' : 'comment'}
            </a>
          </span>
          <span>
            <span 
                type="button" 
                onClick={ async () => {
                    await createLike(article.data.id)
                    await getArticle(article.data.id)
                } }>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
              </svg>&nbsp;
            </span>
            <a href="#user-likes" className='text-decoration-none text-black'>
              {article.data.likes?.length}&nbsp;
              {(article.data.likes?.length > 1) ? 'likes' : 'like'}
            </a>
          </span>
        </div>
      </section>

      <section className='comments my-5'>
          <div className='comment-box'>
            <form onSubmit={submitComment} className='d-flex flex-column align-items-end'>
              <textarea 
                name="comment_body" 
                id="comment_body" 
                className="form-control rounded-0 mb-1" 
                placeholder="Write your comment ..." 
                disabled={ comment.loading } 
                required 
                rows="2">
              </textarea>
              <input 
                  name="comment_article" 
                  id="comment_article" 
                  type="hidden" 
                  value={ article.data.id }
                  className="form-control rounded-0" 
              />
              <button type="submit" className='bg-secondary text-white border-0 py-1 px-2'>Comment</button>
            </form>
          </div>

          <div id='user-comments' className='user-comments mt-5'>
            <h3 className='fw-semibold text-start fs-4' style={{color: 'blueviolet'}}>Comments</h3>
            {(comments.length < 1) ? (
                <div className="d-flex justify-content-end">
                  <p>No comments yet</p>
                </div>
            // ) : (comments.length > 0 && !loading) ? article.data?.comments.map(filteredComment => {
            ) : (comments.length > 0 && !loading) ? comments.filter(comment => comment.article == article.data.title).map(filteredComment => {
                return (
                  <div key={filteredComment.id} className="">
                    <div className="">
                        <div className="d-flex flex-column">
                          <span className="fs-5 fw-bold">{filteredComment.body}</span>
                          <span className="text-secondary fw-bold mt-0">by @{filteredComment.added_by}</span>
                        </div>

                        <div className='comment-reply-box d-flex justify-content-end text-end'>
                          <form onSubmit={submitCommentReply} className=''>
                            <textarea 
                              name="comment_reply_body" 
                              id="comment_reply_body" 
                              className="form-control rounded-0 mb-1" 
                              placeholder="Write your comment reply ..." 
                              required 
                              rows="2">
                            </textarea>
                            <input 
                                name="comment_reply_comment" 
                                id="comment_reply_comment" 
                                type="hidden" 
                                value={ filteredComment.id }
                                className="form-control rounded-0" 
                            />
                            <button type="submit" className='bg-secondary text-white border-0 py-1 px-2'>Reply</button>
                          </form>
                        </div>

                        <div className='comment-replies mt-4'>
                          {(commentReplies.length > 0 && !loading) && commentReplies.filter(commentReply => commentReply.comment == filteredComment.body).map(filteredCommentReply => {
                            return (
                                <div key={filteredCommentReply.id} className="">
                                    <div className="d-flex flex-column text-end">
                                        <span className="fs-5 fw-bold fs-6">{filteredCommentReply.body}</span>
                                        <span className="text-secondary fw-bold fs-6 mt-0">by @{filteredCommentReply.added_by}</span>
                                    </div>
                                </div>
                              )
                            })}
                        </div>
                      
                    </div>
                  </div>
                )
            }) : (
              <div className="d-flex justify-content-center my-5">
                  <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                  </div>
              </div>
            )}
          </div>
      </section>
    </Layout>
  )
}
