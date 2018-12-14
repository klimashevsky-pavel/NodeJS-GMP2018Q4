module.exports = {
    '*.ts': ["prettier --write ./src/**/*.ts", "tslint --fix", "git add"],
};
