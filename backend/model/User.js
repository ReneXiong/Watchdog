class User {
    constructor(username, email, pwd) {
        this.username = username;
        this.email = email;
        this.pwd = pwd;
        this.vcode = undefined;
    }
}

exports.model = User;