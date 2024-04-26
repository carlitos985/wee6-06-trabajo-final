const Category = require("../models/Category")
const request=require("supertest")
const app=require('../app')
const BASE_URL='/api/v1/products'

let category
let TOKEN
let product
let productId

//Hook de creacion de categoria
beforeAll(async()=>{
    const user={
        email:"erika@mail.com",
        password:"erika1234"
    }

    const res = await request(app)
        .post('/api/v1/users/login')
        .send(user)

        TOKEN=res.body.token

    category = await Category.create({
        name:'tecno'
    })
})

test("POST ->'BASE_URL', should return statusCode 201, and res.body.title === product.title ", async()=>{



const product={
    title:"Celular",
    description:"Iphone 14 256gb",
    price:890,
    categoryId:category.id
}

const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set('Authorization', `Bearer ${TOKEN}`)

productId = res.body.id

expect(res.status).toBe(201)
expect(res.body).toBeDefined()
expect(res.body.title).toBe(product.title)

await category.destroy()
})