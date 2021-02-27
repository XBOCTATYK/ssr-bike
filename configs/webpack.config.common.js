const path = require('path');

const rootPath = process.cwd();

module.exports = {
    rootPath: process.cwd(),
    resolve: {
        extensions: ['.jsx', '.js', '.css', '.scss', '.sass', '.pcss', '.module.scss', '.svg'],
        alias: {
            Src: path.join(rootPath, './src/'),
        }
    }
};
