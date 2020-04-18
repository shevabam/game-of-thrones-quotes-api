'use strict';

const express = require('express');


const quotesRepository = require('./quotesRepository');
const app = express();
const port = process.env.PORT || 3001;

app.all('*', function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/v1/random/:num?', function(req, res) {
    res.send(quotesRepository.getRandom(req.params.num || 1));
});

app.get('/v1/author/:name/:num?', function(req, res) {
    res.send(quotesRepository.getByAuthor(req.params.name, req.params.num || 1));
});

app.get('/v1/houses', function(req, res) {
    res.send(quotesRepository.getHouses(null));
});

app.get('/v1/house/:name', function(req, res) {
    res.send(quotesRepository.getHouses(req.params.name));
});

app.get('/v1/characters', function(req, res) {
    res.send(quotesRepository.getCharacters(null));
});

app.get('/v1/character/:name', function(req, res) {
    res.send(quotesRepository.getCharacters(req.params.name));
});

app.listen(port, function() {
    console.log('Server running on port', port);
});