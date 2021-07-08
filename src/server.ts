import http from 'http'

http.createServer((request, response) => {
  if (request.method === 'GET') {
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({ ok: true }))
  }
}).listen(3333)
