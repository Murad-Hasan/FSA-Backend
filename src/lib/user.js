const User = require('../model/user');

const findUser = async () => {
    //find data from database
    let users;
    users = await User.find();
    return users;
}

const createUser = async ({name, email, phone}) => {
    //save data to database
        let user;
        user = await new User({name, email, phone});
        return user.save();
};

module.exports = {findUser, createUser};
