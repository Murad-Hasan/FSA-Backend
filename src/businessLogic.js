const {faker} = require('@faker-js/faker');
/*
* Business Logic - 1
* We have a function that can take two arguments called start and end. Both
arguments will be a valid integer number. The function will return a random value in the given range.
 */
 exports.getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/*
* Business Logic - 2
* We have a function that can generate a fake person profile including first name, last name, email, avatar, age and address. User can pass an array of selected properties and it will return a person object containing only given properties. Ex: generatePerson([’firstName’, ‘lastName’, ‘email’])
* */
 exports.generatePerson = (selectedProperties)=> {
    const properties = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: faker.image.imageUrl(),
        age: Math.floor(Math.random() * (60 - 20 + 1)) + 20,
        address: faker.address.streetAddress()
    };

    const person = {};
    selectedProperties.forEach(property => {
        if (properties.hasOwnProperty(property)) {
            person[property] = properties[property];
        }
    });

    return person;
}


/*
* Business Logic - 3
* We have a function that can accept a string as an argument and return an object containing the number of letters, number of symbols and number of numeric characters.
 */

exports.countCharacters = (str) => {
    const characters = {
        letters: 0,
        symbols: 0,
        numbers: 0
    };

    for (let i = 0; i < str.length; i++) {
        if (str[i].match(/[a-z]/i)) {
            characters.letters++;
        } else if (str[i].match(/[0-9]/)) {
            characters.numbers++;
        } else {
            characters.symbols++;
        }
    }

    return characters;
}