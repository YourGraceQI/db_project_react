/* eslint-disable import/no-extraneous-dependencies */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use('/insurancesys', createProxyMiddleware({ target: 'http://localhost:8000' }));
  app.use('/admin', createProxyMiddleware({ target: 'http://localhost:8000' }));
  app.use('/static/admin', createProxyMiddleware({ target: 'http://localhost:8000' }));
  app.use('/media', createProxyMiddleware({ target: 'http://localhost:8000' }));
};
