import app from 'app';
import initPostgreDB from 'utils/initPostgreDB';
import initMongooseConnection from 'utils/initMongooseConnection';
import { initialMongoImports } from 'utils/initialMongoImports';

const PORT = process.env.PORT || 8080;

initPostgreDB();
initMongooseConnection();
initialMongoImports();

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
