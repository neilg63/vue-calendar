require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const moment = require('moment-timezone');
moment.tz.setDefault('UTC');
const serialize = require('serialize-javascript');


app.use('/public', express.static(path.join(__dirname, 'public')));

let events = [];
let renderer;

if (process.env.NODE_ENV === 'production') {
	let bundle = fs.readFileSync('./dist/node.bundle.js');
	renderer = require('vue-server-renderer').createBundleRenderer(bundle);
}

app.get('/', (req, res) => {
  let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
  let contentMarker = '<!--APP-->';
  if (renderer) {
  	renderer.renderToString({events}, (err, html) => {
	  	if (err) {
	  		console.log(err);
	  	} else {
	  		res.send(template.replace(contentMarker,`${html}\n<script>var __INITIAL_STATE__ = ${serialize(events)}</script>`));
	  	}
	  })
  } else {
  	res.send(`<p>Awaiting compilation</p><script src="/reload/reload.js"></script>`)
  }
  
});



app.use(require('body-parser').json());
app.post('/add-event', (req, res) => {
	events.push(req.body);
	res.sendStatus(200);
});

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
  const reload = require('reload');
  const reloadServer = reload(server, app);
  require('./webpack-dev-middleware').init(app);
  require('./webpack-server-compiler').init(bundle => {
  	let needsReload = renderer === undefined;
  	renderer = require('vue-server-renderer').createBundleRenderer(bundle);
  	if (needsReload) {
  		reloadServer.reload();
  	}
  	
  });
}

server.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  if (process.env.NODE_ENV === 'development') {
    require("open")(`http://localhost:${process.env.PORT}`);
  }
});
