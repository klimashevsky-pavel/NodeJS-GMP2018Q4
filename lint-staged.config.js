module.exports = {
    '*.ts': ["prettier --write ./src/**/*.ts", "tslint", "git add"],
};
