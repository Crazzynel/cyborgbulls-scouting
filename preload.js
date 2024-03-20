// preload.js
window.nodeRequire = require; // Permet d'accéder à require dans la console du navigateur
delete window.require;
delete window.exports;
delete window.module;
