import path from 'path';
import logger from '../../logger';
import DirWatcher from 'utils/dirwatcher';
import Importer from 'utils/importer';
import csvConverter from 'utils/csvConverter';
import { DIRECTORY_FILES_CHANGED } from 'constants/EventNames';

export default function runWatcher(): void {
    const PATH_TO_DATA = path.join(__dirname, '../../data');
    const WATCH_DELAY_MILLISECONDS = 2000;
    const watcher = new DirWatcher();
    const importer = new Importer();

    watcher.watch(PATH_TO_DATA, WATCH_DELAY_MILLISECONDS);

    watcher.on(DIRECTORY_FILES_CHANGED, changedFiles => {
        const asyncReadOperations = [];
        const syncReadResults = [];

        changedFiles.forEach(fileName => {
            asyncReadOperations.push(importer.import(path.join(PATH_TO_DATA, fileName)));
            syncReadResults.push(importer.importSync(path.join(PATH_TO_DATA, fileName)));
        });

        Promise.all(asyncReadOperations)
            .then(data => {
                data.forEach(csvString => {
                    csvConverter
                        .convertToJSON(csvString)
                        .then(csvJSON => console.log('async csvJSON------------>', csvJSON));
                });
            })
            .catch(e => {
                logger.error(e);
            });

        syncReadResults.forEach(csvString => {
            csvConverter
                .convertToJSON(csvString)
                .then(csvJSON => console.log('sync csvJSON------------>', csvJSON));
        });
    });
}
