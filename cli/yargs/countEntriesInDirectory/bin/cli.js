#!/usr/bin/env node
// inspired by: https://github.com/yargs/yargs/blob/master/example/line_count.js

const countEntries = require('../lib/countEntries') // requires our code that does heavy lifting
const log = require('../lib/log') // tiny tool we built to log output that's async/await

const yargs = require('yargs')
  .usage('Usage: $0 --directory=[path to a directory] --recurse') // defines what will be shown when the command errors out
  .options({
    d: {
      alias: 'directory',
      demandOption: true,
      describe: 'the directory to count files within.',
      type: 'string'
    },
    r: {
      alias: 'recurse',
      demandOption: false,
      default: false,
      describe: 'should we recurse on child directories?',
      type: 'boolean'
    }
  })
  .argv

log(countEntries(yargs.directory, yargs.recurse))
