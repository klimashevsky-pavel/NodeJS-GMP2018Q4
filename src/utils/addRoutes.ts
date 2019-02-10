import { Router } from 'express';
import { productsController, usersController } from 'controllers';

export const addRoutes = (router: Router): void => {
    // Products routes
    router.get('/api/products', productsController.getAllProducts);
    router.get('/api/products/:id', productsController.getSingleProduct);
    router.get('/api/products/:id/reviews', productsController.getSingleProductReviews);
    router.post('/api/products', productsController.addProduct);

    // User routes
    router.get('/api/users', usersController.getAllUsers);
};
