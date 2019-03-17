import { Response } from 'express';
import { ExtendedRequest } from 'interfaces/ExtendedRequest';
import {
    getAllProductsFromMongo,
    getProductByIdFromMongo,
    getProductReviewsByIdFromMongo,
    addProductToMongo,
    removeProductFromMongo,
    ProductDocument
} from 'db/interactionsWithMongo';
import logger from '../../logger';

const getAllProducts = (req: ExtendedRequest, res: Response) => {
    getAllProductsFromMongo().then(products => {
        res.status(200).json({ products });
    });
};

const getSingleProduct = (req: ExtendedRequest, res: Response) => {
    getProductByIdFromMongo(req.params.id)
        .then((product: ProductDocument) => {
            res.status(200).json({ product });
        })
        .catch((e: Error) => {
            res.status(400).send('Invalid id provided');
            logger.error(e);
        });
};

const getSingleProductReviews = (req: ExtendedRequest, res: Response) => {
    getProductReviewsByIdFromMongo(req.params.id)
        .then((product: ProductDocument) => {
            res.status(200).json({ reviews: product.reviews });
        })
        .catch((e: Error) => {
            res.status(400).send('Invalid id provided');
            logger.error(e);
        });
};

const addProduct = (req: ExtendedRequest, res: Response) => {
    addProductToMongo(req.body)
        .then(result => {
            res.send(`New Product Successfully added: ${result}`);
        })
        .catch((e: Error) => {
            res.status(400).send('Incorrect data provided');
            logger.error(e);
        });
};

const removeProduct = (req: ExtendedRequest, res: Response) => {
    removeProductFromMongo(req.params.id)
        .then(result => {
            res.send(`Product was successfully deleted`);
        })
        .catch((e: Error) => {
            res.send('Incorrect data provided');
            logger.error(e);
        });
};

export default {
    getAllProducts,
    getSingleProduct,
    getSingleProductReviews,
    addProduct,
    removeProduct
};
