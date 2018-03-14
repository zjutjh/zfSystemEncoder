const tesseract = require('tesseract.js')
const path = require('path')
const fs = require('fs')
const request = require('request')
const tmpPath = path.join('./', 'tmp/')

if (!fs.existsSync(tmpPath)) {
  fs.mkdirSync(tmpPath)
}

function downloadFile (opts = {}, filePath = '') {
  return new Promise((resolve, reject) => {
    request
      .get(opts)
      .on('response', (response) => {
        console.log('img type:', response.headers['content-type'])
      })
      .pipe(fs.createWriteStream(path.join(tmpPath, filePath)))
      .on('error', (e) => {
        console.log("pipe error", e)
        resolve('');
      })
      .on('finish', () => {
        console.log("finish");
        resolve('ok');
      })
      .on('close', () => {
        console.log('close');
      })
  })
}

function recognize (img) {
  return new Promise((resolve, reject) => {
    tesseract.recognize(img, {
      lang: 'eng'
    })
      .progress(function  (p) {console.log('progress', p)})
      .then(resolve).catch(reject)
  })
}

module.exports = async (ctx) => {
  // const url = 'http://www.gdjw.zjut.edu.cn/kaptcha'
  // await downloadFile({ url }, './1.jpg')
  //
  const img = path.resolve(tmpPath, './1.jpg')

  console.log('开始识别', img)
  try {
    const result = await recognize(img)
    console.log('识别完成')
    console.log(result.text)
    ctx.body = result.text
  } catch (e) {
    ctx.body = e.message
  }
}
