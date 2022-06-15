const download = require('download-git-repo');
const { resolve } = require('path')
const fs = require('fs');

// 替换字符串
const replaceStr = function (str, oldStr, newStr) {
    return str.replace(oldStr, newStr);
}

// 读取文件内容为字符串
const readFile = function (filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// 将字符串写入文件
const writeFile = function (filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * @param {string} appName 项目名称
 * @param {object} options 项目选项
 *     options.context
 *     options.author
 *     options.email
 *     options.packageversion
 */
const creator = function (appName, options) {
    let cwd = resolve('./');
    console.log(`will be create a8 project ${appName}`);
    download('tufeiping/a8-fe-ts-template#main', `./${appName}`, function (err) {
        if (!err) {
            let packageJsonPath = `${cwd}/${appName}/package.json`;
            readFile(packageJsonPath).then((data) => {
                let packageJson = JSON.parse(data);
                packageJson.name = appName;
                packageJson.description = `${appName} description`;

                let contextPath = options.context;
                if (contextPath) {
                    packageJson.homepage = `/${contextPath}`;
                }

                let author = options.author || 'Sunny';
                let email = options.email;
                if (email) {
                    packageJson.author = `${author} <${email}>`;
                } else {
                    packageJson.author = `${author}`;
                }

                let packageVersion = options.version;
                if (packageVersion) {
                    packageJson.version = packageVersion;
                }

                let port = options.port;
                if (port) {
                    packageJson.scripts.start = `set port=${port} && node --max_old_space_size=2048 scripts/start.js`;
                }

                writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2)).then(() => {
                    console.log(`successfully created project ${appName}!`);
                    console.log(`cd ${appName} && npm install && npm start`);
                }).catch(err => {
                    console.error('update package.json fail: ', err);
                });
            }).catch(err => {
                console.error('read package.json fail: ', err);
            });
        } else {
            console.error(err);
        }
    })
}

module.exports = creator;