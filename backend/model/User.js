class User {
    constructor(id, email, pwd) {
        this.id = id;
        this.email = email;
        this.pwd = pwd;
        this.vcode = undefined;
    }
}

exports.model = User;