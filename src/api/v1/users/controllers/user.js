const {createUser, findUser} = require("../../../../lib/user");
exports.findUserController = async (req, res) => {
    try{
        const users = await findUser();
        let response = [];
        // add fullName in response and send it to client
        users.forEach(user => {
            response.push({
                ...user._doc,
                fullName: user.fullName
            })
        });

        // const user = await findUserById('64b817a62191d865e125f360')
        //
        // const sameNameUsers = await user.findAllSameName();
        // console.log(sameNameUsers);

        if (response.length !== 0) {
            res.status(200).json({
                status: 'success',
                data: response
            })
        }else{
            res.status(404).json({
                status: 'error',
                code: 404,
                message: 'No users found'
            })
        }
    }catch (e) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: e.message
        })
    }
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
