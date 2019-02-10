import { Response } from 'express';
import { ExtendedRequest } from 'interfaces/ExtendedRequest';

const getAllUsers = (req: ExtendedRequest, res: Response) => {
    // set cookie for cookie parser testing
    res.cookie('name1', 'value1');
    res.cookie('name2', 'value2');
    const stringifiedCookies = JSON.stringify(req.parsedCookies);
    res.send(`I return all Users! And look at your cookies: ${stringifiedCookies}`);
};

export default { getAllUsers };
