const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

class UserRepo extends Model {

    static async getUser(email) {
        return await UserRepo.findByPk(email);
    }

    static async addUser(username, email, pwd) {
        const [user, created] = await UserRepo.findOrCreate(({
            where: {Email: email},
            defaults: {
                userName: username,
                Pass: pwd,
                War: 0,
                Racial: 0,
                Gender: 0,
                Body: 0,
                Sexual: 0
            }
        }))

        console.log(created);

    }

    static async changePwd(email, newPwd) {
        await UserRepo.update({Pass: newPwd}, {
            where: {
              Email: email
            }
        });
    }
}


UserRepo.init( {
    // Model attributes are defined here
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
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
    sequelize,
    modelName: 'Users'
});



exports.repo = UserRepo;