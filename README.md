
```markdown
# AI Image Generator

This project is a web-based tool that generates images based on user-provided text prompts using a JavaScript-powered AI Image Generator API. The tool allows users to specify the number of images they want to generate and displays the generated images in a gallery format.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [API Integration](#api-integration)
- [Proxy Server](#proxy-server)

## Features

- Converts text prompts into images.
- Allows users to specify the number of images to generate.
- Displays generated images in a responsive gallery.
- Provides a download button for each generated image.

## Demo

![AI Image Generator Demo](/preview.png)

## Installation

### Prerequisites

- Node.js and npm installed on your machine.

### Running the Proxy Server

1. Create a `.env` file in the root directory and add your API key:
    ```plaintext
    API_KEY=your-api-key
    ```

2. Start the proxy server:
    ```bash
    node proxy.js
    ```

### Running the Frontend

1. Open `index.html` in your preferred web browser, or use a live server extension in your code editor to serve the project.

## API Integration

The image generation is powered by the LimeWire AI Image Generator API. The API endpoint used for generating images is:

- **Endpoint**: `/api/image/generation`
- **Method**: POST
- **Headers**:
    - `Content-Type`: `application/json`
    - `X-Api-Key`: Your API key
    - `Accept`: `application/json`
- **Body**:
    ```json
    {
      "prompt": "A cute baby sea otter",
      "aspect_ratio": "1:1",
      "samples": 4
    }
    ```

### Example Fetch Request

```javascript
const API_URL = 'http://localhost:3000/api/image/generation';
const API_KEY = 'your-api-key';

async function generateImages(prompt, quantity) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': API_KEY,
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      prompt: prompt,
      aspect_ratio: "1:1",
      samples: quantity
    })
  });

  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return response.json();
}
```

## Proxy Server

To avoid CORS issues, a proxy server is set up using Express and `http-proxy-middleware`. The proxy server forwards the requests to the LimeWire API, adding the necessary headers.

### Proxy Server Setup

```javascript
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const API_KEY = process.env.API_KEY;

app.use(cors());

app.use('/api', createProxyMiddleware({
  target: 'https://api.limewire.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api',
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('X-Api-Key', API_KEY);
  },
}));

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});
```
```