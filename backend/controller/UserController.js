const UserRepo = require('../repository/UserRepo.js').repo;


const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'watchdog51522@gmail.com',     // app account for sending reset email
        pass: '12345'
    }
})
const crypto = require('crypto');


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
                this.res.status(200).json({ "result": "success" });
            }
        }
    }

    async register() {
        const email = this.req.body.email;
        const pwd = this.req.body.pwd;
        const success = await UserRepo.addUser(email, pwd);
        if (success) {
            this.res.status(200).json({ "result": "success" });
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

    async verify(user) {
        var verificationCode = this.req.body.vcode;
        if (verificationCode === user.vcode) {
            console.log('verification successful');
            return true;
        } else {
            console.log('verification failed');
            return false;
        }


    }

    async changeUserPwd(user) {
        var newPwd = this.req.body.pwd;
        UserRepo.changePwd(user,newPwd);
    }

    async forgetOrResetPwd() {
        const userEmail = this.req.body.email;
        const user = await UserRepo.getUser(userEmail);
        if (user != undefined) {

            var randomDigits = crypto.randomBytes(6).toString('base64');
            var mailOptions = {
                from: 'watchdog@gmail.com',
                to: userEmail,
                subject: 'Password reset (watchdog)',
                text: 'Your verification code is: ' + randomDigits,
            };
            user.vcode = randomDigits;
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            if (this.verify(user)) {
                this.changePwd();
                this.changeUserPwd(user);
            } else {
                console.log('Unable to reset the password');
            }

        } else {
            this.res.status(400).json({"message": "user does not exist"});
        }
    }

}

exports.controller = UserController;