import { Response } from 'express';
import { ExtendedRequest } from 'interfaces/ExtendedRequest';
import { getAllUsersFromDb } from 'db/interactionsWithDB';

const getAllUsers = (req: ExtendedRequest, res: Response) => {
    getAllUsersFromDb().then(users => {
        res.status(200).json({ users });
    });
};

export default { getAllUsers };
