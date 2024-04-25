const User = require('../models/User')

const userCreate = async ()=>{

    const user ={
        firstName:'Erika',
        lastName:'Rojas',
        email:'erika@mail.com',
        password:'erika1234',
        phone:'1236547'
    }

    await User.create(user)
}

module.exports = userCreate