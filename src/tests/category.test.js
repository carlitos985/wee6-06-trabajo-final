const request=require('supertest')
const app = require("../app")

const BASE_URL= '/api/v1/categories'

let categoryId
let category

//hook de inicio de sesion
beforeAll(async()=>{
    const user={
        email:'erika@mail.com',
        password:'erika1234',
    }
    const res= await request(app)
        .post('/api/v1/users/login')
        .send(user)
    TOKEN= res.body.token
})
test("POST 'BASE_URL', should return statusCode 201, and res.body.name === category.name", async()=>{
     category={
        name:"Tecnologia",    
    }
    
    const res = await request(app)
        .post(BASE_URL)
        .send(category)
        .set("Authorization", `Bearer ${TOKEN}`)

    categoryId=res.body.id
    
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined() 
    expect(res.body.name).toBe(category.name)
})

test("GET -> 'BASE_URL', should return statusCode 200, and res.body.length === 1", async()=>{
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test('Delete -> BASE_URL, should return statusCode 204', async () => {
    const res = await request(app)
      .delete(`${BASE_URL}/${categoryId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
  
    expect(res.statusCode).toBe(204)
  
     //! siempre va en la ultima linea, del ultimo test del archivo
  })
  
