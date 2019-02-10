import { UrlWithParsedQuery } from 'url';
import { Request } from 'express';

// interface to add custom field to Request
interface ExtendedRequest extends Request {
    parsedQuery: UrlWithParsedQuery;
}

export { ExtendedRequest };
