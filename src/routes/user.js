const {findUserController, createUserController, findUserByIdController} = require("../api/v1/users/controllers/user");
const router = require('express').Router();

router.route('/user')
    .get(findUserController)
    .post(createUserController);

router.route('/user/:id')
    .get(findUserByIdController)


module.exports = router;
