const {createUser, findUser} = require("../../../../lib/user");
exports.findUserController = async (req, res) => {
    const users = await findUser();
    res.status(200).json({
        status: 'success',
        data: users
    })
}

exports.createUserController = async (req, res) => {
    const {name, email, phone} = req.body;
    try {
        const user = await createUser({name, email, phone});
        res.status(200).json({
            status: 'success',
            message: 'user created successfully',
            data: user
        })
    } catch (e) {
        if (e.code === 11000) {
            const errorField = e.keyPattern;
            const [duplicateField] = Object.keys(errorField);
            return res.status(400).json({
                status: 'Bad request',
                message: `${duplicateField} is already taken`
            })
        } else{
            res.status(404).json({
                status: 'Bad request',
                message:`${Object.keys(e.errors)} is required`
        })
        }

    }
}
