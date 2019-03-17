import * as mongoose from 'mongoose';
import * as config from 'config/projectConfig.json';

export default () => {
    const connectionUrl = `${config.mongoDB_connectionURL}/${config.mongoDB_dbName}`;
    mongoose.connect(connectionUrl);
};
