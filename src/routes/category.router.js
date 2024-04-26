const { getAll, create, getOne, remove, update } = require('../controllers/category.controller');
const express = require('express');
const { verifyJWT } = require('../utils/verifyJWT');

const routerCategory = express.Router();

routerCategory.route('/')
    .get(getAll)
    .post(verifyJWT, create);

routerCategory.route('/:id')
    .delete(verifyJWT, remove)
    

module.exports = routerCategory;