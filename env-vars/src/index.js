/**
 * @Author: VU Anh Tuan
 * @Date:   2026-10-16 12:11:32
 * @Last Modified by:   VU Anh Tuan
 * @Last Modified time: 2026-10-16 19:28:39
 */
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const appName = process.env.APP_NAME || 'Default App';

// Middleware to parse JSON request bodies
app.use(express.json());


/**
 * Retrieves the health status of the application
 * @returns {Object} The health status
 */
app.get('/health', (_req, res) => {
  res.json({ 'port': port, 'appName': appName, 'status': 'healthy' });
});


/**
 * Retrieves a greeting message
 * @returns {Object} The greeting message
 */
app.get('/', (_req, res) => {
  res.json({ 'message': `Hello from ${appName}!` });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});