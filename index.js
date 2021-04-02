#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const {readFileJson, printKeysObject} = require('./lib/read-write');
const execa = require('execa');

commander
    .version('1.0.0')
    .name('package-manager')
    .description(chalk.green('simple cli for work with package.json'));

commander
    .command('info')
    //.option('--path <value>', 'path to package json')
    .description('display information about name, version and dependencies by package.json in this directory')
    .action(() => {
        readFileJson('./package.json')
            .then((data) => {
                const {name, version, dependencies} = data;
                console.log(`information about project:\n\tname: ${chalk.green(name)}\n\tversion: ${chalk.green(version)}\n\tdependencies: ${chalk.green(printKeysObject(dependencies))}`);
            })
            .catch((err) => {
                console.log(chalk.redBright('ERROR: there is no package.json file in this directory'));
            });
    });

commander
    .command('add <value>')
    .description('add dependencies to current project')
    .action((value) => {
        console.log('installing dependencies...');
        execa('npm', ['i', value])
            .then(() => {
                console.log('completed!');
            })
            .catch(({stderr}) => {
                console.log(chalk.redBright(stderr));
            });
    });

commander.parse(process.argv);
