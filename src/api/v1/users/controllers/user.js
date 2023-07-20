const {createUser, findUser, findUserById} = require("../../../../lib/user");
exports.findUserController = async (req, res) => {
    const queryData = req.query;
    // console.log(queryData)
    try{
        const users = await findUser(queryData);
        let response = [];
        users.forEach(user => {
            response.push({
                ...user._doc,
                fullName: user.fullName
            })
        });

        if (response.length !== 0) {
            res.status(200).json({
                success: true,
                message: 'Return All users',
                totalUsers: response.length,
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
exports.findUserByIdController = async (req, res) => {
    const {id} = req.params;
    try{
        const user = await findUserById(id);
        // const sameNameUsers = await user.findAllSameName();
        // console.log(sameNameUsers);
        if (user) {
            res.status(200).json({
                success: true,
                code:200,
                message: 'Return single user',
                data: user
            })
        }else{
            res.status(404).json({
                status: 'error',
                code: 404,
                message: 'user not found'
            })
    }}
    catch (e) {
        res.status(500).json({
            status: 'error',
            code: 500,
            message: e.message
        })
    }
};

exports.createUserController = async (req, res) => {
    const {name, email, phone} = req.body;
    try {
        const user = await createUser({name, email, phone});
        res.status(201).json({
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
