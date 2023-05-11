const router = require('express').Router();
const {getRandomInt, generatePerson, countCharacters} = require("./businessLogic");

//get random number route
router.get('/api/random', (req, res) => {
    const {min, max} = req.query;
    const randomNumber = getRandomInt(parseInt(min), parseInt(max));
    res.status(200).json({randomNumber, min, max});
});

//get random person route
router.get('/api/person', (req, res) => {
    const {properties} = req.query;
    const person = generatePerson(properties.split(','));
    res.status(200).json({person, properties});
});

//count characters route
router.get('/api/count', (req, res) => {
    const {str} = req.query;
    const characters = countCharacters(str);
    res.status(200).json({characters, str});
});







//health check
router.get('/health',(req, res) => {
    res.send('OK');
});

module.exports = router;