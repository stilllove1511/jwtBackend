const express = require('express')
const path = require('path')

/**
 * 
 * @param {*} app - express app
 */
const configViewEngine = (app) => {
    app.use(express.static(path.join(__dirname, 'public')))
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'resources', 'views'));
}

module.exports = configViewEngine