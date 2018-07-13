const path = require('path');
const send = require('koa-send');

exports.indexController = async (ctx, next) => {
  await send(ctx, ctx.path, { root: path.resolve(__dirname, '../client', 'dist', 'index.html') });
};
