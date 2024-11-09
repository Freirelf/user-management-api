import http from 'node:http'
import url from 'node:url'
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './controllers/userController.js';


const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;
  const id = parsedUrl.query.id;

  if (path === '/users' && method === 'GET') {
    if (id) {
      req.params = { id }; 
      getUserById(req, res);
    } else {
      getAllUsers(req, res);
    }
  } else if (path === '/users' && method === 'POST') {
    createUser(req, res);
  } else if (path === '/users' && method === 'PUT') {
    req.params = { id };  
    updateUser(req, res);
  } else if (path === '/users' && method === 'DELETE') {
    req.params = { id };  
    deleteUser(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const PORT = 3333;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
