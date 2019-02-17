import { Response } from 'express';
import { ExtendedRequest } from 'interfaces/ExtendedRequest';

const cookieParser = (req: ExtendedRequest, res: Response, next: () => void) => {
    const cookieString = req.get('Cookie');
    req.parsedCookies = parseCookies(cookieString);
    next();
};

const parseCookies = (cookieString: string): object => {
    if (!cookieString) return {};
    const cookiesArray = cookieString.split('; ');
    const result = cookiesArray.reduce((acc, cookie) => {
        const splitedCookie = cookie.split('=');
        const key = splitedCookie[0];
        const value = splitedCookie[1];
        return {
            [key]: value,
            ...acc
        };
    }, {});

    return result;
};

export { cookieParser };
