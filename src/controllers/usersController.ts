import { Response } from 'express';
import { ExtendedRequest } from 'interfaces/ExtendedRequest';

const getAllUsers = (req: ExtendedRequest, res: Response) => {
    res.send('I return all Users!');
};

export default { getAllUsers };
