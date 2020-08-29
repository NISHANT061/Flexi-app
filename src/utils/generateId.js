const faker = require('faker')


export const IdGenerator = ()=>{
    let newID = `${faker.name.prefix}-${faker.name.suffix}`
    return newID
}