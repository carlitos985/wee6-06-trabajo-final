require("../models")
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



   product={
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

//await category.destroy()
})

test("GET -> BASE_URL, should retunr statusCode 200, and res.body===1", async () => {

    const res = await request(app)
      .get(BASE_URL)

        expect(res.status).toBe(200)
        expect(res.body).toBeDefined()
        expect(res.body).toHaveLength(1)

      })
      
//Este es el Get One, dinámica
test("GET -> BASE_URL/:id, should return statusCode 201, and res.body.length === 1", async()=>{
        
  const res= await request(app)
    .get(`${BASE_URL}/${productId}`)
        
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
//¿Por qué nuestro status code es 201 y lo comparamos con 200?
      })
      
//Test de Update
test("PUT->BASE_URL, should return statusCode 200, and res.body.title === bodyUpdate.title", async()=>{

  const bodyUpdate={
    title:"Iphone 15 pro max"
    }

   const res= await request(app)
     .put(`${BASE_URL}/${productId}`)
     .send(bodyUpdate)
     .set('Authorization', `Bearer ${TOKEN}`)
        
      expect(res.status).toBe(200)
      expect(res.body).toBeDefined()
      expect(res.body.title).toBe(bodyUpdate.title) 
        
        await category.destroy() 

      })
      
      test('Delete -> BASE_URL, should return statusCode 204', async()=>{
        const res = await request(app)
        .delete(`${BASE_URL}/${productId}`)
        .set('Authorization',  `Bearer ${TOKEN}`)
        
        expect(res.status).toBe(204)
        //Siempre va al final, en el último test del codigo
        await category.destroy() 
      })

      
      