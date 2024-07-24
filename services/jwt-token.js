const jwt = require('jsonwebtoken');

const generateToken = async function(user){
    // const user = this
    const token = jwt.sign({_id:user._id.toString()}, 'thisismytoken');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

module.exports={
    generateToken
}