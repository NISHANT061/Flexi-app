const faker = require('faker')


export const IdGenerator = ()=>{
    let newID = faker.random.uuid()
    return newID
}