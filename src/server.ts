import express from 'express'

import app from '@/app'

const server = express();

server.use(app);

const port = process.env.SERVER_PORT || '3333';
 
server.listen(port, () => console.log('Running at ' + port));

