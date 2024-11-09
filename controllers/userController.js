import users from "../data/users.js";
import sendJSONResponse from "../utils/response.js";

// Listar todos os usuários
export function getAllUsers(req, res) {
  sendJSONResponse(res, 200, users);
}

// Listar um usuário específico por ID
export function getUserById(req, res) {
  const userId = parseInt(req.params.id)
  const user = users.find(user => user.id === userId);

  if (!user){
    sendJSONResponse(res, 404, { message: "User not found !" });
  }

  sendJSONResponse(res, 200, user);
}

// Criar um novo usuário
export function createUser(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    const { name, email } = JSON.parse(body);

    if(!name || !email) {
      sendJSONResponse(res, 404, { message: "Name and email are required!"})
    }

    const newUser = { 
      id: users.length + 1,
      name, 
      email
    }

    users.push(newUser);
    sendJSONResponse(res, 201, {message: 'User created', user: newUser});
  })
}

// Atualizar usuário
export function updateUser(req, res) {
  const userId = parseInt(req.params.id);
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  }).
  req.on('end', () => {
    const { name, email } = JSON.parse(body);
    const user = users.find(user => user.id === userId);

    if(!user) {
      sendJSONResponse(res, 404, { message: "User not found"});
    }

    user.name = name || user.name;
    user.email = email || user.email

    sendJSONResponse(res, 200, { message: "User updated", user})
  })
}

// Deletar usuário
export function deleteUser(req, res) {
  const userId = parseInt(req.params.id)
  const userIndex = users.findIndex(user => user.id === userId);

  if(userIndex === -1 ) {
    sendJSONResponse(res, 404, { message: "User not found"})
  }

  users.splice(userIndex, 1) 
  sendJSONResponse(res, 200, { message: "User deleted"});

}