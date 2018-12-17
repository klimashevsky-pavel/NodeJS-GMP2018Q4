import EventEmitter from 'events';
import path from 'path';
import fs from 'fs';
import logger from '../../logger';
import { DIRECTORY_FILES_CHANGED } from 'constants/EventNames';

export default class DirWatcher extends EventEmitter {
    private changedFiles = [];
    private allFilesInDirectoryStats = {};

    public watch(dirPath: string, delay: number) {
        setInterval(() => this.readDirectory(dirPath), delay);
    }

    private readDirectory(dirPath: string) {
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
                .then(() => {
                    if (this.changedFiles.length) {
                        this.emit(DIRECTORY_FILES_CHANGED, this.changedFiles);
                        this.changedFiles = [];
                    }
                })
                .catch(e => {
                    logger.error(e);
                });
        };
    }

    private getFileChangesCheckCallback(
        fileName: string,
        resolveFunc: () => void,
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
                this.changedFiles.push(fileName);
            }
            resolveFunc();
        };
    }
}
