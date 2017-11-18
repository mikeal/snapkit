#!/usr/bin/env node
const snapkit = require('./')
const bl = require('bl')
const fs = require('fs')

const yargs = require('yargs')
  .option('emulate', {
    alias: 'e',
    describe: 'emulate a specific device, example: iPhone',
    choices: snapkit.devices
  })
  .option('stdin', {
    alias: 'i',
    default: false,
    describe: 'read page content from stdin'
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    describe: 'output to file instead of stdout'
  })
  .option('selector', {
    alias: '$',
    type: 'string',
    describe: 'selector of element to capture'
  })
const argv = yargs.argv

;(async () => {
  try {
    let image = (async () => {
      if (argv.help) {
        return yargs.help()
      } else {
        if (yargs.stdin) {
          process.stdin.pipe(bl((err, buff) => {
            if (err) throw err
            return snapkit(buff.toString(), argv)
          }))
        } else {
          if (!argv._.length) {
            return yargs.help()
          } else {
            return snapkit(argv._[0], argv)
          }
        }
      }
    })()
    if (image) {
      if (argv.output) {
        fs.writeFileSync(argv.output, await image)
      } else {
        process.stdout.write(await image)
      }
    }
  } finally {
    snapkit.close()
  }
})()
