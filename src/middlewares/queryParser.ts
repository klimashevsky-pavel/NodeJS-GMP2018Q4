import url from 'url';
import { Response } from 'express';
import { ExtendedRequest } from 'interfaces/ExtendedRequest';

const queryParser = (req: ExtendedRequest, res: Response, next: () => void) => {
    req.parsedQuery = url.parse(req.path, true);
    next();
};

export { queryParser };
