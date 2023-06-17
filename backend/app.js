const express = require('express')
const session = require('express-session')

const app = express()
const port = 3000

const UserController = require('./controller/UserController.js').controller;

var fs = require("fs");
var ibm_credentials = fs.readFileSync('ibm.credentials');
const IBMAPIController = require('./controller/IBMAPIController.js').controller;


app.use(session({
    secret: '51522',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 86400000
    }
}))

app.use(express.json());
app.use(express.static('../frontend/login-page/public'));

function auth(func) {
    return (req, res) => {
        if (req.session.userId === undefined) {
            res.status(403).json({ result: 'you need to log in!' });
        } else {
            func(req, res);
        }
    }
}

function globalExceptionHandle(func) {
    return (req, res, next) => {
        func(req, res).catch((e) => {
            console.error(e);
            next(e);
        });
    }
}

app.get('/', (req, res) => {
    if (req.session.userId === undefined) {
        res.sendFile("index.html", {
            root: "../frontend/login-page"
        });
    } else {
        //res.redirect(); // redirect to the page after login;
    }
});

app.get('/register', (req, res) => {
    res.sendFile("register.html", {
        root: "./view"
    });
});

app.post('/login', globalExceptionHandle((req, res) => new UserController(req, res).login()));

app.post('/register', globalExceptionHandle((req, res) => new UserController(req, res).register()));

app.get('/logout', globalExceptionHandle((req, res) => new UserController(req, res).logout()));

app.post('/resetPwd', globalExceptionHandle((req, res) => new UserController(req, res).forgetOrResetPwd()));

app.post('/analyze', globalExceptionHandle((req,res) => new IBMAPIController(req,res, ibm_credentials).callNLUAPI()))

// app.get('/login_test', (req, res) => {
//     if (req.session.userId === undefined) {
//         res.status(403);
//     } else {
//         res.status(200).json({ "result": "sucess" });
//     }
// });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});