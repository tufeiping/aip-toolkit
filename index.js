const program = require("commander");
const creator = require("./lib/creator");

program
    .version('0.1.0')
    .option('-c , --context  [context]', 'context path')
    .usage('create app-name').arguments('create app-name')
    .action(function (cmd, env, p) {
        if (cmd === "create") {
            creator(env, p.context);
        }
    });

program.parse(process.argv);