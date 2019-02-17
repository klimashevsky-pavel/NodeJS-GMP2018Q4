import http, { ServerResponse, IncomingMessage } from 'http';
import logger from '../../logger';

const PORT = 3003;
const headerParams = {
    'Content-Type': 'application/json'
};

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [{ color: 'blue' }, { size: 'XL' }]
};

const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
    let body: string;
    try {
        body = JSON.stringify(product);
    } catch (e) {
        logger.error(e);
    }
    res.writeHead(200, headerParams);
    res.end(body);
};

const server = http.createServer(requestHandler);

server.listen(PORT, (err: Error) => {
    if (err) {
        return console.log(`Error while listening server on port ${PORT}`, err);
    }

    console.log(`Server is listening on ${PORT}`);
});
