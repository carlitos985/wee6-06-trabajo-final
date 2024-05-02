//Estas son las tabals de base de datos que se van a reiniciar
const User=require("./User")
const Category=require("./Category")
const Product = require("./Product")
const Cart = require("./Cart")
const Purchase = require("./Purchase")
const productImg = require("./ProductImg")

//Realcion de productos y categorias
Product.belongsTo(Category)
Category.hasMany(Product)

//Cart relacion con User
Cart.belongsTo(User)
User.hasMany(Cart)

//Cart relacion con productos
Cart.belongsTo(Product)
Product.hasMany(Cart)

//Purchase relacion con User
Purchase.belongsTo(User)
User.hasMany(Purchase)

//Purchase relacion con productos
Product.hasMany(Purchase)
Purchase.belongsTo(Product)

//ProductImg relacion con productId
productImg.belongsTo(Product)
Product.hasMany(productImg)