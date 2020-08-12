const { landingPage, studyPage, giveClassesPage, saveClasses, successPage} = require('./pages.js');

const express = require('express');
const server = express();

const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true
});

// Onde estão os arquivos estáticos.
server.use(express.static('public'));
// Receber dados do req.body
server.use(express.urlencoded( { extended: true } ));

server.get('/', landingPage);
server.get('/study', studyPage);
server.get('/give-classes', giveClassesPage);
server.get('/success', successPage);

server.post('/save-classes', saveClasses);

server.listen(3000);

console.log('\nServidor ativo! \nCTRL + C para desativar');