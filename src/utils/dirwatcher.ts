import EventEmitter from 'events';
import path from 'path';
import fs from 'fs';
import logger from '../../logger';
import { DIRECTORY_FILES_CHANGED } from 'constants/EventNames';

export default class DirWatcher extends EventEmitter {
    private allFilesInDirectoryStats = {};
    private watchTimer;

    public watch(dirPath: string, delay: number) {
        this.watchTimer = setInterval(() => this.checkDirectoryChanges(dirPath), delay);
    }

    private checkDirectoryChanges(dirPath: string) {
        fs.readdir(dirPath, this.getReadDirectoryCallback(dirPath));
    }

    private getReadDirectoryCallback(dirPath: string) {
        return (err: Error, files: string[]) => {
            if (err) {
                logger.error(err);
                throw err;
            }
            const promises = [];
            files.forEach((fileName: string) => {
                promises.push(
                    new Promise((resolveFunc, rejectFunc) => {
                        fs.stat(
                            path.join(dirPath, fileName),
                            this.getFileChangesCheckCallback(fileName, resolveFunc, rejectFunc)
                        );
                    })
                );
            });

            Promise.all(promises)
                .then(data => {
                    const changedFiles = data.filter(Boolean);
                    if (changedFiles) {
                        this.emit(DIRECTORY_FILES_CHANGED, changedFiles);
                    }
                })
                .catch(e => {
                    logger.error(e);
                });
        };
    }

    private getFileChangesCheckCallback(
        fileName: string,
        resolveFunc: (fileName?) => void,
        rejectFunc: (err: Error) => void
    ) {
        return (err: Error, fileStat) => {
            if (err) {
                rejectFunc(err);
                return;
            }
            if (
                !this.allFilesInDirectoryStats[fileName] ||
                this.allFilesInDirectoryStats[fileName].mtime.getTime() !== fileStat.mtime.getTime()
            ) {
                this.allFilesInDirectoryStats[fileName] = fileStat;
                resolveFunc(fileName);
            }
            resolveFunc();
        };
    }
}
