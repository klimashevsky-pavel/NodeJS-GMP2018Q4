import { Router } from 'express';
import { PassportStatic } from 'passport';
import {
    productsController,
    usersController,
    authController,
    citiesController,
    passportController
} from 'controllers';

export const addRoutes = (router: Router, passport: PassportStatic): void => {
    // Authorization
    router.post('/auth', authController.login);
    router.post('/auth/refresh', authController.refreshTokenController);
    // Passport
    router.post(
        '/login/local',
        passport.authenticate('local'),
        passportController.successfulLocalStrategyLogin
    );

    router.get('/login/facebook', passport.authenticate('facebook'));
    router.get('/login/facebook/callback', passportController.successfulFacebookStrategyLogin);
    // Products routes
    // removed auth token check for /api/products for checking passport work
    router.get('/api/products', productsController.getAllProducts);
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
    router.delete('/api/products/:id', productsController.removeProduct);

    // User routes
    router.get('/api/users', authController.verifyToken, usersController.getAllUsers);
    router.delete('/api/users', authController.verifyToken, usersController.removeUser);

    // Cities controller
    router.get('/api/cities', citiesController.getAllCities);
    router.post('/api/cities', citiesController.addCity);
    router.delete('/api/cities/:id', citiesController.removeCity);
    router.put('/api/cities/:id', citiesController.createOrUpdateCity);
};
