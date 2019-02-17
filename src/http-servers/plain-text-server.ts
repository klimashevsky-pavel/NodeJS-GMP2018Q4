import http, { ServerResponse, IncomingMessage } from 'http';

const PORT = 3001;
const headerParams = {
    'Content-Type': 'text/plain'
};

const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
    const body = 'Hello World';
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
