import path, { resolve } from 'path'
import fs from 'fs'

import koa from 'koa'
import koaBody from 'koa-body'

import koaRouter from 'koa-router'


const app = new koa()


const uploadPath = path.join(__dirname, 'public/uploads') 

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath)
 }
 const router = koaRouter()

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
   ctx.set('Access-Control-Allow-Origin', '*');
   ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
   ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.request.method === 'OPTIONS') {
    ctx.status = 200
  }
  ctx.body = "hell,word 132"
  try {
    await next();
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      code: 500,
      msg: err.message
    }
  }
 })


function uploadFn(ctx, destPath) {
  return new Promise((resolve, reject) => {
    const { name, path: _path } = ctx.request.files.file // 拿到上传的文件信息
    const filePath = destPath || path.join(uploadPath, name) // 重新组合文件名

    // 将临时文件重新设置文件名及地址
    fs.rename(_path, filePath, (err) => {
      if (err) {
        return reject(err)
      }
      resolve(filePath)
    })
  })
}

app.use(koaBody({
  multipart:true,
  formidable: {
    maxFieldsSize: 1024 * 1024 * 1024,
    uploadDir:uploadPath
  }
}))

router.post('/api/upload/file', (ctx) => {
  console.log(ctx.request.body,133,JSON.stringify(ctx.request))
    const { index, hash } = ctx.request.body
    const chunksPath = path.join(uploadPath, hash, '/')
    if(!fs.existsSync(chunksPath)) {
      fs.mkdirSync(chunksPath)
    }
    const chunksFileName = chunksPath + hash + '-' + index
    uploadFn(ctx,chunksFileName).then(() => {
      ctx.body = {
        code: 0,
        url: path.join('http://localhost:3000/uploads'),
        msg: '文件上传成功'
      }
    }).catch(err => {
      console.log(err);
      ctx.body = {
        code: -1,
        msg: '文件上传失败'
      }
    })
})


  app.use(router.routes());
  app.listen(3000, () => {
    console.log('服务启动成功');
  })