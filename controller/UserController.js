const UserRepo = require('../repository/UserRepo.js').repo;

class UserController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async login() {
        if (this.req.session !== undefined && this.req.session.userId !== undefined) {
            this.res.status(200).json({ result: 'already logged in' });
        } else {
            const email = this.req.body.email;
            const pwd = this.req.body.pwd;
            //TODO: add input check
            const user = await UserRepo.getUser(email);
            if (user === undefined || user.pwd !== pwd) {
                this.res.status(403).json({ "message": "account information is not correct" });
            } else {
                this.req.session.userId = email;
                this.res.status(200).json({ "result": "sucess" });
            }
        }
    }

    async register() {
        const email = this.req.body.email;
        const pwd = this.req.body.pwd;
        const success = await UserRepo.addUser(email, pwd);
        if (success) {
            this.res.status(200).json({ "result": "sucess" });
        } else {
            this.res.status(400).json({ "message": "this email has been registered" });
        }
    }

    async logout() {
        if (this.req.session !== undefined) {
            this.req.session.destroy();
        }

        this.res.status(200);
    }

}

exports.controller = UserController;