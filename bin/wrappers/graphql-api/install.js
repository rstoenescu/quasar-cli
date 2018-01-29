var
  path = require('path'),
  download = require('download-git-repo'),
  ora = require('ora'),
  uid = require('uid'),
  log = require('../../../lib/log'),
  qfs = require('../../../lib/qfs')

function generate (src, dest) {
  qfs.copy(path.join(src, 'template'), dest)

  log()
  log.success('Apollo wrapper created at', dest.yellow)
  log.info('Read quick documentation on the GraphQL API wrapper at ' + 'https://github.com/quasarframework/quasar-wrapper-graphql-api'.bold)
  log()
  log('  ★ Change directory to the wrapper')
  log('    $ cd api')
  log('  ★ Install dependencies')
  log('    $ npm install')
  log()
}

module.exports = function (options) {
  var
    appPath = options.appPath,
    src = '/tmp/quasar-wrapper-api-graphql-' + uid(),
    dest = path.join(appPath, 'api'),
    spinner = ora('Downloading Quasar GraphQL API template...')

  spinner.start()
  download(
    'quasarframework/quasar-wrapper-graphql-api',
    src,
    function (err) {
      spinner.stop()
      process.on('exit', function () {
        qfs.remove(src)
      })

      if (err) {
        if (err === 404) {
          log.fatal('GraphQL wrapper template may have moved. Please update to the latest Quasar CLI.')
          // ^^^ EARLY EXIT
        }

        log.fatal('Failed to download Quasar GraphQL API template: ' + err)
        // ^^^ EARLY EXIT
      }

      log.success('Downloaded Quasar GraphQL API template.')
      generate(src, dest)
    }
  )
}
