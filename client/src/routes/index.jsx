const routeNames = {
    'home': '/', 
    'categories.index': '/categories', 
    'categories.show': '/categories/:id', 
    'sub-categories.index': '/sub-categories', 
    'sub-categories.show': '/sub-categories/:id', 
    'articles.index': '/articles', 
    'articles.show': '/articles/:id', 
    'authors.show': '/authors/:id', 
    'search': '/search', 
    'register': '/register', 
    'login': '/login', 

    // Auth routes
    'dashboard': '/dashboard', 
    'dashboard.categories.index': '/dashboard/categories', 
    'dashboard.categories.create': '/dashboard/categories/create', 
    'dashboard.categories.show': '/dashboard/categories/:id', 
    'dashboard.categories.edit': '/dashboard/categories/:id/edit', 
    'dashboard.sub-categories.index': '/dashboard/sub-categories', 
    'dashboard.sub-categories.create': '/dashboard/sub-categories/create', 
    'dashboard.sub-categories.show': '/dashboard/sub-categories/:id', 
    'dashboard.sub-categories.edit': '/dashboard/sub-categories/:id/edit', 
    'dashboard.articles.index': '/dashboard/articles', 
    'dashboard.articles.create': '/dashboard/articles/create', 
    'dashboard.articles.show': '/dashboard/articles/:id', 
    'dashboard.articles.edit': '/dashboard/articles/:id/edit', 
    'dashboard.comments.index': '/dashboard/comments', 
    'dashboard.comments.create': '/dashboard/comments/create', 
    'dashboard.comments.show': '/dashboard/comments/:id', 
    'dashboard.comments.edit': '/dashboard/comments/:id/edit', 
    'dashboard.comment-replies.index': '/dashboard/comment-replies', 
    'dashboard.comment-replies.edit': '/dashboard/comment-replies/:id/edit', 
    'dashboard.likes.index': '/dashboard/likes', 
    'dashboard.authors.index': '/dashboard/authors', 
    'dashboard.authors.create': '/dashboard/authors/create', 
    'dashboard.authors.show': '/dashboard/authors/:id', 
    'dashboard.authors.edit': '/dashboard/authors/:id/edit', 
    'dashboard.profile': '/dashboard/profile', 
}

function route(name, params = {}) {
  let url = routeNames[name]
 
  for (let prop in params) {
    if (Object.prototype.hasOwnProperty.call(params, prop)) {
      url = url.replace(`:${prop}`, params[prop])
    }
  }

  return url
}

export { route }