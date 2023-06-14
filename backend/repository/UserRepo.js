const User = require('../model/User.js').model;

//mock-up data for test
const USER_DB = [
    new User(0, "abc@123.com", "12345")
]

class UserRepo {
    static async getUser(email) {
        return USER_DB.find((u) => {
            return u.email === email;
        })
    }

    static async addUser(email, pwd) {
        USER_DB.push(new User(1, email, pwd));
        return 1;
    }
}

exports.repo = UserRepo;