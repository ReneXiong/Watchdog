class User {
    constructor(id, email, pwd) {
        this.id = id;
        this.email = email;
        this.pwd = pwd;
    }
}

exports.model = User;