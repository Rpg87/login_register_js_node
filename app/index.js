'use strict';

import express from 'express';
//Fix for __dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));



// Server
const app = express();
app.set('port', 4000);
app.listen(app.get('port'));
console.log('Servidor funcionando en ', app.get('port'));

//Configuration
app.use(express.static(__dirname + '/public'));

//Routes

app.get('/', (req, res) => res.sendFile(__dirname + '/pages/login.html'));
app.get('/register', (req, res) => res.sendFile(__dirname + '/pages/register.html'));
app.get('/admin', (req, res) => res.sendFile(__dirname + '/pages/admin/admin.html'));