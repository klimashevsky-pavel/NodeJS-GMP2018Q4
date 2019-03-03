import { Response } from 'express';
import { ExtendedRequest } from 'interfaces/ExtendedRequest';

const successfulLocalStrategyLogin = (req: ExtendedRequest, res: Response) => {
    res.send(`Successful login for User: ${req.user.userName}`);
};

const successfulFacebookStrategyLogin = (req: ExtendedRequest, res: Response) => {
    res.send(`Successful Facebook login`);
};

export default { successfulLocalStrategyLogin, successfulFacebookStrategyLogin };
