// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function karmaConfig (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'], //, 'phantomjs-shim'
    reporters: ['spec', 'coverage'],
    hostname: 'localhost.wyqcd.cn',
    files: [
      './script/bootstrap.min.css',
      './script/beyond.min.css',
      './script/teld-default.min.css',
      './sg.mock.js',
      './ci.cd.param.js',
      './script/i18n/zh/wrp.js',
      './script/i18n/zh/app.js',
      './script/platform.config.js',
      './script/jquery-2.1.4.js',
      './script/bootstrap.min.js',
      './script/teld-thirdpart.min.js',
      './script/teld-core.min.js',
      './script/window-variable.js',
      './script/teld-helper-list-17.js',
      './script/teld-performance.min.js',
      './script/teld-components.min.js',
      './script/teld-before-vue.min.js',
      '../../node_modules/babel-polyfill/dist/polyfill.js',
      './index.js'
    ],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    listenAddress: 'localhost',
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    browserNoActivityTimeout: 240000
    // processKillTimeout:240000
  })
}
