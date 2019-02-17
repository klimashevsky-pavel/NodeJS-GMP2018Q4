import { Router } from 'express';
import { productsController, usersController, authController } from 'controllers';

export const addRoutes = (router: Router): void => {
    // Authorization
    router.post('/auth', authController.login);
    router.post('/auth/refresh', authController.refreshTokenController);
    // Products routes
    router.get('/api/products', authController.verifyToken, productsController.getAllProducts);
    router.get(
        '/api/products/:id',
        authController.verifyToken,
        productsController.getSingleProduct
    );
    router.get(
        '/api/products/:id/reviews',
        authController.verifyToken,
        productsController.getSingleProductReviews
    );
    router.post('/api/products', authController.verifyToken, productsController.addProduct);

    // User routes
    router.get('/api/users', authController.verifyToken, usersController.getAllUsers);
};
