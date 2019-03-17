import { User, Product } from 'models/mongo';
import { products } from 'utils/dbModels/products';
import { users } from 'utils/dbModels/users';
import logger from '../../logger';

export const initialMongoImports = () => {
    User.insertMany(users, err => {
        if (err) {
            return logger.error(err);
        }
        console.log('Users were successfully inserted!');
    });
    Product.insertMany(products, err => {
        if (err) {
            return logger.error(err);
        }
        console.log('Products were successfully inserted!');
    });
};
