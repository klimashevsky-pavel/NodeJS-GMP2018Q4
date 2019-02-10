import { Response } from 'express';
import { ExtendedRequest } from 'interfaces/ExtendedRequest';

const getAllProducts = (req: ExtendedRequest, res: Response) => {
    res.send('I return all Products!');
};

const getSingleProduct = (req: ExtendedRequest, res: Response) => {
    res.send(`I return Product with id: ${req.params.id}`);
};

const getSingleProductReviews = (req: ExtendedRequest, res: Response) => {
    res.send(`I return all reviews for Product with id: ${req.params.id}`);
};

const addProduct = (req: ExtendedRequest, res: Response) => {
    res.send(`I add new Product. Body: ${req.body}`);
};

export default {
    getAllProducts,
    getSingleProduct,
    getSingleProductReviews,
    addProduct
};
