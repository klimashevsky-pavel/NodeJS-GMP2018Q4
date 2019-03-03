import { Response } from 'express';
import { ExtendedRequest } from 'interfaces/ExtendedRequest';
import { db } from 'db';

const getAllProducts = (req: ExtendedRequest, res: Response) => {
    db.Product.findAll().then(products => {
        res.status(200).json({ products });
    });
};

const getSingleProduct = (req: ExtendedRequest, res: Response) => {
    db.Product.findById(req.params.id).then(product => {
        res.status(200).json({ product });
    });
};

const getSingleProductReviews = (req: ExtendedRequest, res: Response) => {
    db.Product.findById(req.params.id).then(product => {
        res.status(200).json({ reviews: product.reviews });
    });
};

const addProduct = (req: ExtendedRequest, res: Response) => {
    db.Product.create(req.body)
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
