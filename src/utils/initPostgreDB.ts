import { db } from 'db';
import { initialImportToDb } from 'utils/initialImportToDb';

export default () => {
    db.sequelize.sync();
    initialImportToDb(db);
};
