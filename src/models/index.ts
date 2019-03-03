import Sequelize from 'sequelize';
import UserFactory from 'models/user';
import ProductFactory from 'models/product';

const DATABASE_NAME = 'nodejs_mentoring';
const DATABASE_USERNAME = 'postgres';
const DATABASE_PASSWORD = 'password';

export const createModels = () => {
    const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
        dialect: 'postgres'
    });

    const db = {
        sequelize,
        Sequelize,
        User: UserFactory(sequelize, Sequelize),
        Product: ProductFactory(sequelize, Sequelize)
    };

    Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    return db;
};
