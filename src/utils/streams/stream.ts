const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');
const argsParser = require('minimist');
const through2 = require('through2');
const multistream = require('multistream');

const helpMessage = `
=================================
Usage: node <scriptPath> --action(-a)=<actionType> <additional arguments>

Actions:
    reverse - reverses string data, written to the console and prints it to the console
    transform - transforms string data, written to the console, to upper case and prints it to the console
    outputFile - reads file from provided file path and prints it to the console
        arguments:
            --file(-f) - path to file
    convertFromFile - convert .csv file contents to json and prints it to the console
        arguments:
            --file(-f) - path to file
    convertToFile - convert .csv file contents to json and writes it to new json file
        arguments:
            --file(-f) - path to file
=================================
`;
const specifyActionMessage = 'Please, specify action';
const wrongActionNameMessage = 'Wrong action name';
const wrongArguments = 'Please, specify all necessary arguments for this action';
const additionalInfoMessage = 'For usage instructions, use --help command';

const txtExtension = '.txt';
const jsonExtension = '.json';
const csvExtension = '.csv';
const cssExtension = '.css';

const argsConfig = {
    HELP: 'help',
    ACTION: 'action',
    ACTION_SHORT: 'a',
    FILE: 'file',
    FILE_SHORT: 'f',
    PATH: 'path',
    PATH_SHORT: 'p'
};

const actionTypes = {
    REVERSE: 'reverse',
    TRANSFORM: 'transform',
    OUTPUT_FILE: 'outputFile',
    CONVERT_FROM_FILE: 'convertFromFile',
    CONVERT_TO_FILE: 'convertToFile',
    CSS_BUNDLER: 'cssBundler'
};

const actionsHandlers = {
    [actionTypes.REVERSE]: reverse,
    [actionTypes.TRANSFORM]: transform,
    [actionTypes.OUTPUT_FILE]: outputFile,
    [actionTypes.CONVERT_FROM_FILE]: convertFromFile,
    [actionTypes.CONVERT_TO_FILE]: convertToFile,
    [actionTypes.CSS_BUNDLER]: cssBundler
};

const actionsArgsConfig = {
    [actionTypes.OUTPUT_FILE]: [{ argName: argsConfig.FILE, argNameShort: argsConfig.FILE_SHORT }],
    [actionTypes.CONVERT_FROM_FILE]: [
        { argName: argsConfig.FILE, argNameShort: argsConfig.FILE_SHORT }
    ],
    [actionTypes.CONVERT_TO_FILE]: [
        { argName: argsConfig.FILE, argNameShort: argsConfig.FILE_SHORT }
    ],
    [actionTypes.CSS_BUNDLER]: [{ argName: argsConfig.PATH, argNameShort: argsConfig.PATH_SHORT }]
};

function prepareReversedString(str: string): string {
    return (
        str
            .split('')
            .reverse()
            .join('')
            .trim() + '\n'
    );
}

function reverseStringData(chunk, enc, next) {
    const chunkString = chunk.toString();
    const reversedString = prepareReversedString(chunkString);
    this.push(reversedString);
    next();
}

function transformStringData(chunk, enc, next) {
    const chunkString = chunk.toString();
    const stringUpperCase = chunkString.toUpperCase();
    this.push(stringUpperCase);
    next();
}

function exitWithHelpMessage(): void {
    exitWithMessage(helpMessage);
}

function exitWithMessageWithAdditions(message: string): void {
    const messageWithAdditions = addAdditionalInfoToMessage(message);
    exitWithMessage(messageWithAdditions);
}

function exitWithMessage(message: string): void {
    console.log(message);
    process.exit();
}

function addAdditionalInfoToMessage(message: string): string {
    return `\n${message}\n${additionalInfoMessage}\n`;
}

function specifyArgumentsForAction(args: object, actionType: string): string[] {
    const actionTypeArgs = actionsArgsConfig[actionType];
    if (!actionTypeArgs) {
        return [];
    }
    const actionsArgs = actionTypeArgs.reduce((acc, item) => {
        const argument = args[item.argName] || args[item.argNameShort];
        if (!argument) {
            exitWithMessageWithAdditions(wrongArguments);
        }
        acc.push(argument);
        return acc;
    }, []);

    return actionsArgs;
}

function callAction(args: object): void {
    const actionArg = args[argsConfig.ACTION];
    const actionShortArg = args[argsConfig.ACTION_SHORT];
    const actionType = actionArg || actionShortArg;

    const action = actionsHandlers[actionType];
    if (action) {
        const actionArgs = specifyArgumentsForAction(args, actionType);
        action.apply(null, actionArgs);
    } else {
        exitWithMessageWithAdditions(wrongActionNameMessage);
    }
}

function reverse() {
    process.stdin.pipe(through2(reverseStringData)).pipe(process.stdout);
}

function transform() {
    process.stdin.pipe(through2(transformStringData)).pipe(process.stdout);
}

function outputFile(fileName: string) {
    if (!path.extname(fileName)) {
        fileName = fileName + txtExtension;
    }
    const filePath = path.resolve(__dirname, fileName);
    const readFileStream = fs.createReadStream(filePath).on('error', e => {
        exitWithMessage(e);
    });
    readFileStream.pipe(process.stdout);
}

function convertFromFile(fileName: string) {
    if (!path.extname(fileName)) {
        fileName = fileName + csvExtension;
    }
    const filePath = path.resolve(__dirname, fileName);
    const csvToConsole = fs
        .createReadStream(filePath)
        .pipe(csv())
        .on('error', e => {
            exitWithMessage(e);
        });
    csvToConsole.pipe(process.stdout);
}

function convertToFile(fileName: string) {
    if (!path.extname(fileName)) {
        fileName = fileName + csvExtension;
    }
    const indexOfExtensionStart = fileName.indexOf(csvExtension);
    const pureFileName = fileName.slice(0, indexOfExtensionStart);
    const newFileName = pureFileName.concat(jsonExtension);

    const filePath = path.resolve(__dirname, fileName);
    const newFilePath = path.resolve(__dirname, newFileName);

    fs.createReadStream(filePath)
        .pipe(csv())
        .pipe(fs.createWriteStream(newFilePath))
        .on('error', e => {
            exitWithMessage(e);
        });
}

function cssBundler(dirPath: string) {
    fs.readdir(dirPath, (err, fileNames) => {
        if (err) {
            exitWithMessage(err);
        }
        const cssFileNames = fileNames.filter(fileName => path.extname(fileName) === cssExtension);
        bundelCSS(dirPath, cssFileNames);
    });
}

function bundelCSS(dirPath: string, cssFileNames: string[]) {
    const cssReadStreams = [];
    cssFileNames.forEach(cssFileName => {
        const cssFilePath = path.resolve(dirPath, cssFileName);
        cssReadStreams.push(fs.createReadStream(cssFilePath));
    });

    const endCssFilePath = path.resolve(dirPath, '../nodejs-homework3.css');
    cssReadStreams.push(fs.createReadStream(endCssFilePath));

    const bundleCssPath = path.resolve(dirPath, 'bundle.css');
    multistream(cssReadStreams).pipe(fs.createWriteStream(bundleCssPath));
}

function main(): void {
    const args = argsParser(process.argv.slice(2));
    const firstArgument = Object.keys(args)[1]; // arguments start from second item in object
    if (firstArgument === argsConfig.HELP && args[argsConfig.HELP]) {
        exitWithHelpMessage();
    } else if (!args[argsConfig.ACTION_SHORT] && !args[argsConfig.ACTION]) {
        exitWithMessageWithAdditions(specifyActionMessage);
    } else {
        callAction(args);
    }
}

main();
