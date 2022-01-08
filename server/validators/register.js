function validatePasswordLen(password){
    if(password.length < 6 || password.length > 20){
        throw new Error("The password must be between 6 and 20 symbols")
    }
}

function validateMatchingPasswords(firstPassword , secondPassword){
    if(firstPassword !== secondPassword){
        throw new Error("Password and confirm password must match")
    }
}

function validateUsername(username){
    if(username.length < 6 || username.length > 15){
        throw new Error("The username must be between 6 and 15 symbols")
    }
}


module.exports = {
    validateMatchingPasswords , 
    validateUsername,
    validatePasswordLen
}