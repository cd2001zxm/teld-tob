/**
 * Created by chendong on 2017/8/3.
 */

var fs = require('fs')
var path = require('path')

function TeldMoveFileWebpackPlugin () {
}

function yellow (str) {
  console.log('\u001b[1m\u001b[33m' + str + '\u001b[39m\u001b[22m')
}
function green (str) {
  console.log('\u001b[1m\u001b[32m' + str + '\u001b[39m\u001b[22m')
}

var fileList = ['frame.js','frame.js.map','Index.js','Index.js.map','vendor.js','vendor.js.map']

TeldMoveFileWebpackPlugin.prototype.apply = function (compiler) {

  var ROOT_PATH = path.resolve('')

  compiler.plugin('done', function (compilation, callback) {

    green('------copy bundle to dir [plugin]')
    for(var index in fileList){
      var fileName = fileList[index]
      fs.writeFileSync(path.join(ROOT_PATH, '/plugin/'+fileName), fs.readFileSync(path.join(ROOT_PATH, '/dist/static/js/'+fileName)))
    }
    // fs.writeFileSync(path.join(ROOT_PATH, '/plugin/frame.js'), fs.readFileSync(path.join(ROOT_PATH, '/dist/static/js/frame.js')))
    // fs.writeFileSync(path.join(ROOT_PATH, '/plugin/Index.js'), fs.readFileSync(path.join(ROOT_PATH, '/dist/static/js/Index.js')))
    // fs.writeFileSync(path.join(ROOT_PATH, '/plugin/vendor.js'), fs.readFileSync(path.join(ROOT_PATH, '/dist/static/js/vendor.js')))
    //fs.writeFileSync(path.join(ROOT_PATH, '/plugin/frame.css'), fs.readFileSync(path.join(ROOT_PATH, '/dist/static/css/frame.css')))
    green('------end copy!!!')
    //callback();
  })

}

module.exports = TeldMoveFileWebpackPlugin
