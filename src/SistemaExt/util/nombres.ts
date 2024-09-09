import { fakerES as faker } from '@faker-js/faker'

export const getNombre = () => {
    let nombre = faker.person.fullName().split(' ')?.splice(0,2)?.join(' ')
    return nombre.slice(0,12)
}
//console.log(getNombre())