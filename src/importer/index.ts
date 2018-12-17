import fs from 'fs';

export default class Importer {
    public import(filePath: string) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    public importSync(filePath: string) {
        return fs.readFileSync(filePath, { encoding: 'utf8' });
    }
}
