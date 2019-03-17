import { Response } from 'express';
import { ExtendedRequest } from 'interfaces/ExtendedRequest';
import {
    getAllCitiesFromMongo,
    addCityToMongo,
    updateOrCreateCityInMongo,
    removeCityFromMongo
} from 'db/interactionsWithMongo';
import logger from '../../logger';

const getAllCities = (req: ExtendedRequest, res: Response) => {
    getAllCitiesFromMongo().then(cities => {
        res.status(200).json({ cities });
    });
};

const addCity = (req: ExtendedRequest, res: Response) => {
    addCityToMongo(req.body)
        .then(result => {
            res.send(`New City Successfully added: ${result}`);
        })
        .catch((e: Error) => {
            res.status(400).send('Incorrect data provided');
            logger.error(e);
        });
};

const createOrUpdateCity = (req: ExtendedRequest, res: Response) => {
    const id = req.params.id;
    const city = req.body;
    updateOrCreateCityInMongo(id, city)
        .then(result => {
            if (result.upserted) {
                return res.send('City was successfully upserted');
            }
            res.send('City was successfully updated');
        })
        .catch((e: Error) => {
            res.send('Incorrect data provided');
            logger.error(e);
        });
};

const removeCity = (req: ExtendedRequest, res: Response) => {
    removeCityFromMongo(req.params.id)
        .then(result => {
            res.send(`City was successfully deleted`);
        })
        .catch((e: Error) => {
            res.send('Incorrect data provided');
            logger.error(e);
        });
};

export default {
    getAllCities,
    addCity,
    createOrUpdateCity,
    removeCity
};
