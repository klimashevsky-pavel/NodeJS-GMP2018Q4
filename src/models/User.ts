import * as Sequelize from 'sequelize';
import { ProductAttributes } from 'models/product';

export interface UserAttributes {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    products?: ProductAttributes[];
    createdAt?: Date;
    updatedAt?: Date;
}

type UserInstance = Sequelize.Instance<UserAttributes> & UserAttributes;
type UserModel = Sequelize.Model<UserInstance, UserAttributes>;

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {
    const attributes = {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING
    };

    const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

    User.associate = models => {
        User.hasMany(models.Product, { foreignKey: 'ownerId', as: 'products' });
    };

    return User;
};
