import { forEach } from 'lodash';
import { products } from 'utils/dbModels/products';
import { users } from 'utils/dbModels/users';

export const initialImportToDb = db => {
    forEach(products, product => {
        db.Product.create(product);
    });
    forEach(users, user => {
        db.User.create(user);
    });
};
