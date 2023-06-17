class User {
    constructor(username, email, pwd) {
        this.username = username;
        this.email = email;
        this.pwd = pwd;
        this.vcode = undefined;
        this.war = 0;
        this.racial = 0;
        this.gender = 0;
        this.body = 0;
        this.sexual = 0;
    }
}

exports.model = User;