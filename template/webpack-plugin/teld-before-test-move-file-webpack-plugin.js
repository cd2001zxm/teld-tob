/**
 * Created by chendong on 2020/3/3.
 */

var fs = require('fs')
var path = require('path')

function TeldBeforeTestMoveFileWebpackPlugin () {
}

function yellow (str) {
  console.log('\u001b[1m\u001b[33m' + str + '\u001b[39m\u001b[22m')
}
function green (str) {
  console.log('\u001b[1m\u001b[32m' + str + '\u001b[39m\u001b[22m')
}

//var fileList = ['/config/teld-router-config.js','/dev-setting/platform.config.js','teld-helper-list-17.js']

TeldBeforeTestMoveFileWebpackPlugin.prototype.apply = function (compiler) {

  var ROOT_PATH = path.resolve('')

  compiler.plugin('before-run', function (compilation, callback) {

    green('------测试相关文件复制开始:-------')

    //fs.writeFileSync(path.join(ROOT_PATH, '/test/unit/script/teld-router-config.js'), fs.readFileSync(path.join(ROOT_PATH, '/config/teld-router-config.js')))
    fs.writeFileSync(path.join(ROOT_PATH, '/test/unit/script/platform.config.js'), fs.readFileSync(path.join(ROOT_PATH, '/dev-setting/platform.config.js')))
    fs.writeFileSync(path.join(ROOT_PATH, '/test/unit/script/teld-helper-list-17.js'), fs.readFileSync(path.join(ROOT_PATH, '/dev-setting/teld-helper-list-17.js')))

    green('------测试相关文件复制完毕:-------')
    //callback();
  })

}

TeldBeforeTestMoveFileWebpackPlugin.prototype.execute = function(){

    var ROOT_PATH = path.resolve('')
    
    green('------测试相关文件复制开始:-------')

    //fs.writeFileSync(path.join(ROOT_PATH, '/test/unit/script/teld-router-config.js'), fs.readFileSync(path.join(ROOT_PATH, '/config/teld-router-config.js')))
    fs.writeFileSync(path.join(ROOT_PATH, '/test/unit/script/platform.config.js'), fs.readFileSync(path.join(ROOT_PATH, '/dev-setting/platform.config.js')))
    fs.writeFileSync(path.join(ROOT_PATH, '/test/unit/script/teld-helper-list-17.js'), fs.readFileSync(path.join(ROOT_PATH, '/dev-setting/teld-helper-list-17.js')))

    green('------测试相关文件复制完毕:-------')
}

module.exports = TeldBeforeTestMoveFileWebpackPlugin
