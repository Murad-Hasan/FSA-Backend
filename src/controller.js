const {getRandomInt, generatePerson, countCharacters} = require("./businessLogic");
exports.randomNumberController = (req, res) => {
    const {min, max} = req.query;
    const randomNumber = getRandomInt(parseInt(min), parseInt(max));
    res.status(200).json({randomNumber, min, max});
}

exports.personGenerateController = (req, res) => {
    const {properties} = req.query;
    const person = generatePerson(properties.split(','));
    res.status(200).json({person, properties});
}

exports.countCharactersController = (req, res) => {
    const {str} = req.query;
    const characters = countCharacters(str);
    res.status(200).json({characters, str});
}

exports.healthCheckController = (req, res) => {
    res.send('OK');
}