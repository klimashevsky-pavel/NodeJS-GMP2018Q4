import * as Sequelize from 'sequelize';

export interface ProductAttributes {
    id?: number;
    name: string;
    reviews: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

type ProductInstance = Sequelize.Instance<ProductAttributes> & ProductAttributes;
type ProductModel = Sequelize.Model<ProductInstance, ProductAttributes>;

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): ProductModel => {
    const attributes = {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reviews: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        }
    };

    const Product = sequelize.define<ProductInstance, ProductAttributes>('Product', attributes);

    Product.associate = models => {
        Product.belongsTo(models.User, { foreignKey: 'ownerId' });
    };

    return Product;
};
