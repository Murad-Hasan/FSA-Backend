const {findUserController, createUserController} = require("../api/v1/users/controllers/user");
const router = require('express').Router();

router.route('/user')
    .get(findUserController)
    .post(createUserController);


module.exports = router;
