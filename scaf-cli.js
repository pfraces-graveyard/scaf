var clide = require('clide'),
    scaf = require('./scaf');

clide({
    template: 'template',
    fold: 'fold'
}, function (config) {
    scaf(config.template, config)
        .fold(config.fold)
        .end();
});
