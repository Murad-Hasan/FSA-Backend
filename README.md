# Make our algorithm live using REST API
## Requirements 
- We have a function that can take two arguments called start and end. Both arguments will be a valid integer number. The function will return a random value in the given range.
- We have a function that can generate a fake person profile including first name, last name, email, avatar, age and address. User can pass an array of selected properties and it will return a person object containing only given properties. Ex: generatePerson([’firstName’, ‘lastName’, ‘email’])
- We have a function that can accept a string as an argument and return an object containing the number of letters, number of symbols and number of numeric characters.

## Business Logic file location
- src/businessLogic.js

## API Endpoints (GET)
- api/random?min=1&max=100
- api/person?properties=firstName,lastName,email
- api/count?str=18pad085!#$

## Dependencies
- express
- @faker-js/faker (dev)
- nodemon (dev)