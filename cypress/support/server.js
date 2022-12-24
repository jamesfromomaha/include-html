let http = require('http');
let fs = require('fs');

let index = `
<html>
  <head>
    <title>Test page</title>
  </head>
  <body>
    <h1>Html Includes</h1>
    <p>about to include html as a document</p>
    <include-html rel="loadme.html" action="before" selector="#the-anchor"></include-html>
    <p>it should be loaded right before the next paragraph</p>
    <p id="the-anchor">before this one</p>
    <script src="include-html.js"></script>
  </body>
</html>
`;
let loadme = `
<body>
  <p>yep it loaded</p>
  <script>
    let el = document.createElement('i');
    el.innerHtml = 'yep it loaded';
    document.body.appendChild(el);
  </script>
</body>
`;

let server = http.createServer(function (req, res) {
  switch (req.url.split('/').pop()) {
    case 'index.html':
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(index);
    break;
  case 'loadme.html':
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(loadme);
    break;
  case 'include-html.js':
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/javascript');
    fs.readFile('../../src/include-html.js', (data) => res.end(data));
    break;
  default:
    console.error(`'${req.url}' not found:\n${Object.keys(req).join('\n')}`);
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

server.listen(3000, '127.0.0.1', () => console.log('Server running on :3000'));
