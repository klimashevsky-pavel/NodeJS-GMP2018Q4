import http, { ServerResponse, IncomingMessage } from 'http';
import { Readable } from 'stream';
import { readFileSync } from 'fs';
import path from 'path';

const PORT = 3002;
const UTF8 = 'utf8';
const message = 'Hello from HTML Server!!!';
const headerParams = {
    'Content-Type': 'text/html'
};

// for some reason, they ask to implement custom stream with readFileSync
const createCustomReadableStream = filePath => {
    const readFileCustomStream = new Readable({
        read() {
            const data = readFileSync(filePath, UTF8);
            const templatedHtmlString = templateHtmlData(data);
            this.push(templatedHtmlString);
            this.push(null);
        }
    });

    return readFileCustomStream;
};

const templateHtmlData = (htmlString: string) => {
    const templatedHtmlString = htmlString.replace('{message}', message);
    return templatedHtmlString;
};

const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
    const htmlPath = path.join(__dirname, 'index.html');
    const customReadableStream = createCustomReadableStream(htmlPath);
    res.writeHead(200, headerParams);
    customReadableStream.pipe(res);
};

const server = http.createServer(requestHandler);

server.listen(PORT, (err: Error) => {
    if (err) {
        return console.log(`Error while listening server on port ${PORT}`, err);
    }

    console.log(`Server is listening on ${PORT}`);
});
