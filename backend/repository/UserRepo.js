const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
});



class UserRepo extends Model {

    static async getUser(email) {
        return await UserRepo.findByPk(email);
    }

    static async addUser(username, email, pwd) {
        const [user, created] = await UserRepo.findOrCreate(({
            where: {email: email},
            defaults: {
                username: username,
                pwd: pwd,
                War: 0,
                Racial: 0,
                Gender: 0,
                Body: 0,
                Sexual: 0
            }
        }))

        return user;


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
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    pwd: {
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
    modelName: 'UserRepo'
});

(async () => {
    await sequelize.sync();
})();

exports.repo = UserRepo;