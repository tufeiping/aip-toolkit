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
            } else {
                resolve();
            }
        });
    });
}

const creator = function (name, contextPath) {
    let cwd = resolve('./');
    console.log(`${name} - ${contextPath} ${cwd}`);
    download('tufeiping/a8-fe-ts-template#main', `./${name}`, function (err) {
        if (!err) {
            readFile(cwd + `/${name}/package.json`).then(data => {
                let packageJson = JSON.parse(data);
                packageJson.name = name;
                packageJson.description = `${name} description`;
                if (contextPath) {
                    packageJson.homepage = `/${contextPath}`;
                }
                writeFile(cwd + `/${name}/package.json`, JSON.stringify(packageJson, null, 2)).then(() => {
                    console.log('Successfully created project!');
                }).catch(err => {
                    console.error(err);
                });
            }).catch(err => {
                console.error(err);
            });
        } else {
            console.error(err);
        }
    })
}

module.exports = creator;