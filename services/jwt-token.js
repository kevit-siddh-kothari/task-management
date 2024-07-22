const jwt = require('jsonwebtoken')
const {Auth} = require('../models/auth')

const GenerateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, 'thisismytoken')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token;
}

module.exports={
    GenerateToken
}