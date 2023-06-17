const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');


const UserRepo = sequelize.define('User', {
    // Model attributes are defined here
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    War: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Racial: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Gender: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Body: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Sexual: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    // Other model options go here
});


class UserRepo extends Model {

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