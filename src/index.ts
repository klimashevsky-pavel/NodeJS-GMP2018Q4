import app from 'app';
import initPostgreDB from 'utils/initPostgreDB';

const PORT = process.env.PORT || 8080;

initPostgreDB();
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
