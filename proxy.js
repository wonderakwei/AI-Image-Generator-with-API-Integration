const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

app.use(cors()); // Enable CORS for all routes

app.use('/api', createProxyMiddleware({
  target: 'https://api.limewire.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api',
  },
  onProxyReq: (proxyReq, req, res) => {
    // Add the API key header
    proxyReq.setHeader('X-Api-Key', API_KEY);
  },
}));

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});
