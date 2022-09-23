import koa from 'koa'
import koaBody from 'koa-body'
const app = new koa()

app.use((ctx) => {
  ctx.body = 'Hello World';
  console.log(ctx);
})

app.listen(3000);