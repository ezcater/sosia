const {parse} = require('url');
const {getScreenshot} = require('./chromium');

module.exports = async function(req, res) {
  try {
    const {pathname = '/', query = {}} = parse(req.url, true);
    const {type = 'png', height, width} = query;
    const viewport = height && width ? {height: Number(height), width: Number(width)} : undefined;
    const url = pathname.slice(1);
    const file = await getScreenshot({url, type, viewport});
    res.statusCode = 200;
    res.setHeader('Content-Type', `image/${type}`);
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
    console.error(e.message);
  }
};
