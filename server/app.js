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
 
  if (ctx.request.method === 'OPTIONS') {
    ctx.status = 200
  }
  ctx.body = "hell,word123"
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

app.use(koaBody({
  multipart:true,
  formidable: {
    maxFieldsSize: 1024 * 1024 * 1024,
    uploadDir:uploadPath
  }
}))
function uploadFn (ctx) {
  return new Promise((resolve, reject) => {
    const { name, path: _path } = ctx.request.files.file 
    const filePath = path.join(uploadPath, name) 
    fs.rename(_path, filePath, (err) => { 
      if (err) {
        return reject(err)
      }
      resolve(name)
    })
  })
}

router.post('/api/upload/file', async (ctx) => {
  try {
    let data = await uploadFn(ctx)
    ctx.body = {
      code: 0,
      url: path.join('http://localhost:3000/uploads'),
      msg: '文件上传成功'
    }
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: -1,
      msg: '文件上传失败'
    }
  }
})


app.use(router.routes())
app.listen(3000);