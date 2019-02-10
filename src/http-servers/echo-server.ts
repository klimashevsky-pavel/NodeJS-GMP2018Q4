import http, { ServerResponse, IncomingMessage } from 'http';

const PORT = 3004;

const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200);
    req.pipe(res);
};

const server = http.createServer(requestHandler);

server.listen(PORT, (err: Error) => {
    if (err) {
        return console.log(`Error while listening server on port ${PORT}`, err);
    }

    console.log(`Server is listening on ${PORT}`);
});
