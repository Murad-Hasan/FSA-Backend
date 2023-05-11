const {randomNumberController, personGenerateController, countCharactersController, healthCheckController} = require("./controller");
const router = require('express').Router();

//get random number route
router.get('/api/random', randomNumberController);

//get random person route
router.get('/api/person', personGenerateController);

//count characters route
router.get('/api/count', countCharactersController);

//health check
router.get('/health', healthCheckController);

module.exports = router;