
const { getAll, create, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const verifyJwt=require('../utils/verifyJWT')


const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJwt,getAll)
    .post(verifyJwt,create);

routerUser.route('/:id')
    .delete(remove)
    .put(update);

routerUser.route('/login')
    .post(login)
    

module.exports = routerUser;