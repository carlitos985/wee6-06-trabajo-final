const request=require("supertest")
const app = require("../app")


const BASE_URL='/api/v1/users'

let TOKEN

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

//Hacemos el test de login
test("GET -> BASE_URL, should return statusCode 200, and res.body.length ===1", async()=>{
    
    const res=await request(app)
        .get(BASE_URL)
        .set('Authorization',`Bearer ${TOKEN}`)
    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})