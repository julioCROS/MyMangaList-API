const app = require('../src/app');
const http = require('http');
const debug = require('debug')('node-str:server');

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log("Server online na porta:", port);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error){
  if(error.syscall != 'listen'){
    throw error;
  }

  const bind = typeof port === 'string' ? 
  'Pipe ' + port :
  'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      break;

    default:
      throw error;
      break;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);  
}