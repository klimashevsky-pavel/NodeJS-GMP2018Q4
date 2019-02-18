import jwt from 'jsonwebtoken';
import uuid from 'uuid/v4';
import { find, reject } from 'lodash';
import { Response } from 'express';
import users from 'config/users';
import * as config from 'config/projectConfig.json';
import { ExtendedRequest } from 'interfaces/ExtendedRequest';

interface RefreshToken {
    userName: string;
    refreshToken: string;
}

const AUTHORIZATION_HEADER_KEY = 'authorization';
const TOKEN_START_INDEX = 7;

let refreshTokensCollection: RefreshToken[] = [];

const formTokenDataObject = (userName: string) => {
    const refreshToken = uuid();
    const secret = config.jwt_secret;
    return {
        token: jwt.sign({ userName }, secret, { expiresIn: '20000ms' }),
        refreshToken
    };
};

const login = (req: ExtendedRequest, res: Response) => {
    const { userName, password } = req.body;
    const userFromDB = find(users, { userName, password });
    if (!userFromDB) {
        return res.status(404).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }

    const tokenData = formTokenDataObject(userName);
    const response = {
        code: 200,
        message: 'OK',
        data: {
            user: userFromDB
        },
        ...tokenData
    };

    refreshTokensCollection = reject<RefreshToken>(refreshTokensCollection, { userName });
    refreshTokensCollection.push({ userName, refreshToken: tokenData.refreshToken });
    res.status(200).json({ ...response });
};

const refreshTokenController = (req: ExtendedRequest, res: Response) => {
    const { refreshToken } = req.body;
    const existingItem = find<RefreshToken>(refreshTokensCollection, { refreshToken });
    if (!existingItem) {
        return res.status(404).json({
            success: false,
            message: 'Faild to refresh token'
        });
    }

    const { userName } = existingItem;
    const tokenData = formTokenDataObject(userName);
    const response = {
        code: 200,
        message: 'OK',
        ...tokenData
    };

    refreshTokensCollection = reject<RefreshToken>(refreshTokensCollection, {
        refreshToken,
        userName
    });
    refreshTokensCollection.push({ userName, refreshToken: tokenData.refreshToken });
    res.status(200).json({ ...response });
};

const verifyToken = (req: ExtendedRequest, res: Response, next: () => void) => {
    const authHeader = req.headers[AUTHORIZATION_HEADER_KEY];
    const token =
        authHeader && authHeader.startsWith('Bearer ')
            ? authHeader.slice(TOKEN_START_INDEX)
            : authHeader;

    if (token) {
        jwt.verify(token, config.jwt_secret, err => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

export default {
    login,
    refreshTokenController,
    verifyToken
};
