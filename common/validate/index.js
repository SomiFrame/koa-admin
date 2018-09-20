let validate = require('validate.js')

let constraints = {
    email: {
        email: true
    },
    string: {
        presence: {
            allowEmpty: false
        }
    },
    password: {
        format: {
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,15}$",
            flags: "g",
            message: ""
        }
    },
    confirmPassword: {
        equality: "password"
    }
}

module.exports=constraints
