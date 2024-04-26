//Estas son las tabals de base de datos que se van a reiniciar
const User=require("./User")
const category=require("./Category")
const Product = require("./Product")
const Category = require("./Category")

//Realcion de productos y categorias
Product.belongsTo(Category)
Category.hasMany(Product)

