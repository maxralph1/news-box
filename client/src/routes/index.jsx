const routeNames = {
    'home': '/', 
    'categories.index': '/categories', 
    'categories.show': '/categories/:id', 
    'sub-categories.index': '/sub-categories', 
    'sub-categories.show': '/sub-categories/:id', 
    'articles.index': '/articles', 
    'articles.show': '/articles/:id', 
    'register': '/register', 
    'login': '/login', 
    'dashboard': '/dashboard', 
    // 'search': '/search', 
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