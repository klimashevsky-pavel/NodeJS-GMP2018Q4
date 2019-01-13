import csv from 'csvtojson';

const convertToJSON = (csvString: string) => csv({}).fromString(csvString);

export default {
    convertToJSON
};
