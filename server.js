const express = require ("express");
const cors = require ("cors");

const expressApp = express();

expressApp.use(cors({ 
  origin: "*" 
}));
expressApp.use(express.json());

import { createClient } from 'redis';

const client = createClient();

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();