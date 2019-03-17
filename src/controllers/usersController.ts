import { Response } from 'express';
import { ExtendedRequest } from 'interfaces/ExtendedRequest';
import { getUsersFromMongo, removeProductFromMongo } from 'db/interactionsWithMongo';
import logger from '../../logger';

const getAllUsers = (req: ExtendedRequest, res: Response) => {
    getUsersFromMongo().then(users => {
        res.status(200).json({ users });
    });
};

const removeUser = (req: ExtendedRequest, res: Response) => {
    removeProductFromMongo(req.params.id)
        .then(() => {
            res.send(`User was successfully deleted`);
        })
        .catch((e: Error) => {
            res.send('Incorrect data provided');
            logger.error(e);
        });
};

export default { getAllUsers, removeUser };
