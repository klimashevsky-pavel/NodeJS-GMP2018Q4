import { Document } from 'mongoose';
import { User, Product, City } from 'models/mongo';

export const getUsersFromMongo = () => User.find({});

export const removeUserFromMongo = (id: string) => User.remove({ _id: id });

export const getAllProductsFromMongo = () => Product.find({});

export const getProductByIdFromMongo = (id: string) => Product.findById(id);

export const getProductReviewsByIdFromMongo = (id: string) =>
    Product.findById(id, { reviews: 1, _id: 0 });

export const addProductToMongo = product => Product.create(product);

export const removeProductFromMongo = (id: string) => Product.remove({ _id: id });

export const getAllCitiesFromMongo = () => City.find({});

export const addCityToMongo = city => City.create(city);

export const updateOrCreateCityInMongo = (id: string, city) =>
    City.update({ _id: id }, { _id: id, ...city }, { upsert: true });

export const removeCityFromMongo = (id: string) => City.remove({ _id: id });

export { ProductDocument } from 'interfaces/mongoDocuments/Product';
