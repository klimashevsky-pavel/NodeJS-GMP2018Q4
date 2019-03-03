import { Response } from 'express';
import { ExtendedRequest } from 'interfaces/ExtendedRequest';
import { db } from 'db';

const getAllUsers = (req: ExtendedRequest, res: Response) => {
    db.User.findAll().then(users => {
        res.status(200).json({ users });
    });
};

export default { getAllUsers };
