import { Response } from 'express';
import { ExtendedRequest } from 'interfaces/ExtendedRequest';
import { getAllProductsFromDb, getProductByIdFromDb, addProductToDb } from 'db/interactionsWithDB';

const getAllProducts = (req: ExtendedRequest, res: Response) => {
    getAllProductsFromDb().then(products => {
        res.status(200).json({ products });
    });
};

const getSingleProduct = (req: ExtendedRequest, res: Response) => {
    getProductByIdFromDb(req.params.id).then(product => {
        res.status(200).json({ product });
    });
};

const getSingleProductReviews = (req: ExtendedRequest, res: Response) => {
    getProductByIdFromDb(req.params.id).then(product => {
        res.status(200).json({ reviews: product.reviews });
    });
};

const addProduct = (req: ExtendedRequest, res: Response) => {
    addProductToDb(req.body)
        .then(result => {
            res.send(`New Product Successfully added: ${result}`);
        })
        .catch(() => {
            res.send('Incorrect data provided');
        });
};

export default {
    getAllProducts,
    getSingleProduct,
    getSingleProductReviews,
    addProduct
};
