const request=require("supertest")
const app = require("../app")

require('../models')


const BASE_URL='/api/v1/users'

let TOKEN
let userId

beforeAll(async()=>{
    const user={
        email:"erika@mail.com",
        password:"erika1234"
    }
    const res=await request(app)
        .post(`${BASE_URL}/login`)
        .send(user)

    //console.log(res.body.token)
    //console.log(res.body.length)

    //El token lo usamos para Endpoints privados
    TOKEN=res.body.token    
})

//Hacemos el test de Get
test("GET -> BASE_URL, should return statusCode 200, and res.body.length ===1", async()=>{
    
    const res=await request(app)
        .get(BASE_URL)
        //.set('Authorization',` Bearer ${TOKEN}`) rutas privadas
        .set('Authorization',`Bearer ${TOKEN}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

//test del POST create
test("POST -> BASE_URL, should return statusCode 201, and res.body.firstName===user.firstName",async()=>{
    const user = {
        firstName:"Ponky",
        lastName:"Bernal",
        email:"ponky@mail.com",
        password:"ponky1234",
        phone:"5236417"
    }

    const res= await request(app)
        .post(BASE_URL)
        .send(user)
    userId=res.body.id //Se creó previamente como variable global

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})

//Test de Update (rutas dinámicas)
test("PUT->BASE_URL, should return statusCode 200, and res.body.firstName===userUpdate.firstName", async()=>{
    const userUpdate={
        firstName:"Lady"
    }

    const res= await request(app)
        .put(`${BASE_URL}/${userId}`)
        .send(userUpdate)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(userUpdate.firstName)
})

//test de login
test("POST->'BASE_URL/login', should return statusCode 200, res.body.user.email===user.email and res.body.token to be defined", async()=>{
    const user={
        email:"erika@mail.com",
        password:"erika1234"
    }
    const res= await request(app)
        .post(`${BASE_URL}/login`)
        .send(user)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).toBe(user.email)
    expect(res.body.token).toBeDefined()
})
/*
test("POST 'BASE_URL/login', should return statusCode 401", async () => {
    const userInvalid = {
        email:"erika@mail.com",
        password:"Invalid Pasword"
    }
  
    const res = await request(app)
      .post(`${BASE_URL}/login`)
      .send(userInvalid)
    console.log(res.body)
    expect(res.statusCode).toBe(401)
  })*/
  test("DELETE -> 'BASE_URL/:id', should return statusCode 204", async()=>{
    const res= await request(app)
        .delete(`${BASE_URL}/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
    
        expect(res.statusCode).toBe(204)
  })
