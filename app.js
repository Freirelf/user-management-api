import http from 'node:http'
import url from 'node:url'
import { createUser, getAllUsers, getUserById } from './controllers/userController';


const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  if (path === '/users' && method === 'GET') {
    getAllUsers(req, res)
  } else if ( path.match(/^\/users\/\d+$/) && method === 'GET') {
    req.params = { id: path.split('/')[2]}
    getUserById(req, res)
  } else if (path === '/users' && method === 'POST') {
      createUser(req, res)
  } else if ( path.match(/^\/users\/\d+$/) && method === 'PUT') {
      req.params = { id: path.split('/')[2]}
  } else if ( path.match(/^\/users\/\d+$/) && method === 'DELETE') {
      req.params = { id: path.split('/')[2]}
  } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Route not found"}))
  }

})

const PORT = 3333;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
