const download = require("download-git-repo");
const { resolve } = require("path");
const fs = require("fs");

// 替换字符串
const replaceStr = function (str, oldStr, newStr) {
  return str.replace(oldStr, newStr);
};

// 读取文件内容为字符串
const readFile = function (filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

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
};

/**
 * @param {string} name 项目/库名称
 * @param {object} options 项目选项
 * @param {number} createType 创建类型，1：项目，2：库，3：客户端
 *
 *
 *     options.context
 *
 *     options.author
 *
 *     options.email
 *
 *     options.packageversion
 */
const creator = function (name, options, createType) {
  if (createType === 1) {
    creatorApp(name, options);
  } else if (createType === 2) {
    createLib(name, options);
  } else if (createType === 3) {
    createRich(name, options);
  } else {
    console.error("create type error");
  }
};

const creatorApp = function (appName, options) {
  let cwd = resolve("./");
  console.log(`will be create a8 project ${appName}`);
  download(
    "yonyouaudit/a8-fe-ts-template#main",
    `./${appName}`,
    function (err) {
      if (!err) {
        let packageJsonPath = `${cwd}/${appName}/package.json`;
        readFile(packageJsonPath)
          .then((data) => {
            let packageJson = JSON.parse(data);
            packageJson.name = appName;
            packageJson.description = `${appName} description`;

            let contextPath = options.context;
            if (contextPath) {
              packageJson.homepage = `/${contextPath}`;
            }

            let author = options.author || "Sunny";
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

            writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
              .then(() => {
                console.log(`successfully created project ${appName}!`);
                console.log(`cd ${appName} && npm install && npm start`);
              })
              .catch((err) => {
                console.error("update package.json fail: ", err);
              });
          })
          .catch((err) => {
            console.error("read package.json fail: ", err);
          });
      } else {
        console.error(err);
      }
    }
  );
};

const createLib = function (libName, options) {
  let cwd = resolve("./");
  console.log(`will be create aip module ${libName}`);
  download(
    "yonyouaudit/aip-module-ts-template#main",
    `./${libName}`,
    function (err) {
      if (!err) {
        let packageJsonPath = `${cwd}/${libName}/package.json`;
        readFile(packageJsonPath)
          .then((data) => {
            let packageJson = JSON.parse(data);
            packageJson.name = libName;
            packageJson.description = `${libName} description`;

            let author = options.author || "Sunny";
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

            writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
              .then(() => {
                console.log(`successfully created module ${libName}!`);
                console.log(`cd ${libName} && ./buildandpublish.sh`);
              })
              .catch((err) => {
                console.error("update package.json fail: ", err);
              });
          })
          .catch((err) => {
            console.error("read package.json fail: ", err);
          });
      } else {
        console.error(err);
      }
    }
  );
};

const writJSON = function (packageJsonPath, appName, options, callback) {
  readFile(packageJsonPath)
    .then((data) => {
      let packageJson = JSON.parse(data);
      packageJson.name = appName;
      packageJson.description = `${appName} description`;

      let author = options.author || "Sunny";
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

      writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
        .then(() => {
          callback && callback();
        })
        .catch((err) => {
          console.error("update package.json fail: ", err);
        });
    })
    .catch((err) => {
      console.error("read package.json fail: ", err);
    });
};

const createRich = function (appName, options) {
  let cwd = resolve("./");
  console.log(`will be create aip rich-client ${appName}`);
  console.log(
    `Notice!!!: you must set ELECTRON_MIRROR environment before you use this command`
  );
  console.log();
  console.log(
    `npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron`
  );
  console.log();
  download("yonyouaudit/aip-electron#main", `./${appName}`, function (err) {
    if (!err) {
      let packageJsonPath = `${cwd}/${appName}/package.json`;
      let innerPackageJsonPath = `${cwd}/${appName}/release/app/package.json`;
      writJSON(packageJsonPath, appName, options, () => {
        writJSON(innerPackageJsonPath, appName, options, () => {
          console.log(`successfully created module ${appName}!`);
          console.log(
            `npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron`
          );
          console.log(`cd ${appName} && ./buildandpublish.sh`);
        });
      });
    } else {
      console.error(err);
    }
  });
};

module.exports = creator;
