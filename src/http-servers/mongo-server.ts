import http, { ServerResponse, IncomingMessage } from 'http';
import { MongoClient, Collection } from 'mongodb';
import * as config from 'config/projectConfig.json';
import logger from '../../logger';
import citiesMocks from 'http-servers/mongoMocks';

const PORT = 3006;
const headerParams = {
    'Content-Type': 'application/json'
};
const COLLECTION_NAME = 'cities';

const getRequestHandler = (collection: Collection) => (
    req: IncomingMessage,
    res: ServerResponse
) => {
    collection
        .aggregate([{ $sample: { size: 1 } }])
        .toArray()
        .then(data => {
            res.writeHead(200, headerParams);
            const dataJSON = JSON.stringify(data[0]);
            res.end(dataJSON);
        })
        .catch(e => {
            logger.error(e);
        });
};

MongoClient.connect(
    config.mongoDB_connectionURL,
    { useNewUrlParser: true },
    (connectError, client) => {
        if (connectError) {
            return logger.error(connectError);
        }

        const db = client.db(config.mongoDB_dbName);
        const collection = db.collection(COLLECTION_NAME);

        collection.insertMany(citiesMocks, insertError => {
            if (insertError) {
                return logger.error(insertError);
            }
            const requestHandler = getRequestHandler(collection);

            const server = http.createServer(requestHandler);

            server.listen(PORT, (err: Error) => {
                if (err) {
                    return console.log(`Error while listening server on port ${PORT}`, err);
                }

                console.log(`Server is listening on ${PORT}`);
            });
        });
    }
);
