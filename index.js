#! /usr/bin/env node

const program = require("commander");
const creator = require("./lib/creator");

function main() {
  program.version("0.1.8");
  program.usage("create app-name [options]");
  program
    .command("create <app-name>")
    .option("-c, --context <context>", "front-end context path")
    .option("-a, --author <author>", "front-end project creator")
    .option("-e, --email <email>", "front-end project creator email")
    .option("-v, --version <version>", "front-end project version")
    .option("-p, --port <port>", "front-end project listene port")
    .action(function (appName, options) {
      creator(appName, options, 1);
    });

  program
    .command("module <module-name>")
    .option("-a, --author <author>", "front-end project creator")
    .option("-e, --email <email>", "front-end project creator email")
    .option("-v, --version <version>", "front-end project version")
    .action(function (appName, options) {
      creator(appName, options, 2);
    });

  program
    .command("rich <app-name>")
    .option("-a, --author <author>", "rich-client project creator")
    .option("-e, --email <email>", "rich-client project creator email")
    .option("-v, --version <version>", "rich-client project version")
    .action(function (appName, options) {
      creator(appName, options, 3);
    });

  program.description(
    "create a8 project/aip-module/rich-client from base template"
  );
  program.parse(process.argv);
}

if (require.main === module) {
  main();
}
