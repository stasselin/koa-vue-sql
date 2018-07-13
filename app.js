const Koa = require('koa');
const assets = require('koa-static');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const convert = require('koa-convert');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const index = require('./routes/index');
const api = require('./routes/api');

const app = new Koa();

app.use(assets('client/dist'));
app.use(logger());
app.use(cors());
app.use(
  convert(
    session({
      cookie: {
        signed: false
      }
    })
  )
);
app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.body = `Error 500`;
    ctx.status = 500;
    console.log(e);
  }
});

app.use(api.routes());
app.use(index.routes());

app.listen(3001);
console.log('Server is listening on port 3001');
