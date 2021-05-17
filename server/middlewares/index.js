const isProd = process.env.NODE_ENV === 'production';
const compression = require('compression');

module.exports = app => {
  if (isProd) {
    app.use(compression());
  } else {
  }
};
