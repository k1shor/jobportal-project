const User = require("../models/UserModel")

module.exports.getUserFriends = async (req, res) => {
    const id =req.params.id;
    
    
    
}

module.exports.getAllUsers = async (req, res) => {
    const query = req.query.user;
    
    const users = await User.find({_id: {$ne: query}})
        .select("username profile_picture")
    return res.status(200).json(users);
}