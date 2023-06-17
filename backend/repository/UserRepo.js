const User = require('../model/User.js').model;

//mock-up data for test
const USER_DB = [
    new User("Wilson Edwarz", "abc@123.com", "123456")
]

class UserRepo {
    static async getUser(email) {
        return USER_DB.find((u) => {
            return u.email === email;
        })
    }

    static async addUser(username, email, pwd) {
        const user = USER_DB.find((u) => {
            return u.email === email;
        })
        if (user !== undefined) return 0;
        USER_DB.push(new User(username, email, pwd));
        USER_DB.forEach(element => console.log(element));
        return 1;
    }

    static async changePwd(user, newPwd) {
        USER_DB[USER_DB.indexOf(user)].pwd = newPwd;
        console.log('password successfully changed!');
    }
}

exports.repo = UserRepo;