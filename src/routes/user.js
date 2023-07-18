const {findUserController, createUserController} = require("../api/v1/users/controllers/user");
const router = require('express').Router();


router.get('/user', findUserController);
router.post('/user', createUserController);


module.exports = router;
