const User = require('../model/user');

const findUser = async (queryData) => {
    //find data from database
    let users;
    if (queryData.id) {
        users = await User.find({_id: queryData.id});
    }else{
        users = await User.find();
    }
    return users;
}
//findById

const findUserById = async (id) => {
    let user;
    user = await User.findById(id);
    return user;
};

const createUser = async ({name, email, phone}) => {
    //save data to database
        let user;
        user = await new User({name, email, phone});
        return user.save();
};

module.exports = {findUser, createUser, findUserById};
