
const { getAll, create, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const {verifyJWT}= require('../utils/verifyJWT')


const routerUser = express.Router();

routerUser.route('/')
    .get(verifyJWT,getAll)
    .post(create);

routerUser.route('/:id')
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

routerUser.route('/login')
    .post(login)
    

module.exports = routerUser;