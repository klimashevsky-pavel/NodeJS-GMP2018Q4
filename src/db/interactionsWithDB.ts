import { db } from 'db';

const getAllUsersFromDb = () => db.User.findAll();

const getAllProductsFromDb = () => db.Product.findAll();

const getProductByIdFromDb = id => db.Product.findById(id);

const addProductToDb = product => db.Product.create(product);

export { getAllUsersFromDb, getAllProductsFromDb, getProductByIdFromDb, addProductToDb };
