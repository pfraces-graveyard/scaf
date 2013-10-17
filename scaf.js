var $ = require('shelljs'),
    walk = require('walk'),
    ejs = require('ejs'),
    path = require('path'),
    fs = require('fs');

var Scaf = function (tpl, options) {
    var self = this;

    self.tpl = tpl;
    self.options = options;

    // create a tmp dir for save in the compiled template,
    // allowing for multiple fast fold operations
    var tempDir = $.tempdir(),
        tmp = tempDir + '/scaf.' + process.pid;

    $.mkdir(tmp);
    self.tmp = tmp;

    // compile templates recursively with ejs
    // and save them on the tmp dir
    var walker = walk.walk(tpl);
    self.walker = walker;
    self.done = false;

    walker.on("end", function () {
        self.done = true;
    });

    walker.on("directory", function (root, dir, next) {
        var source = path.join(root, dir.name),
            target = source.replace(self.tpl, self.tmp);

        $.mkdir(target);
        next();
    });

    walker.on("file", function (root, file, next) {
        var source = path.join(root, file.name),
            target = source.replace(self.tpl, self.tmp);

        fs.readFile(source, function (err, data) {
            if (err) throw new Error(err);

            ejs.render(data.toString(), self.options).to(target);
            next();
        });
    });
};

Scaf.prototype.fold = function (target) {
    var self = this;

    var copy = function () {
        $.cp('-R', self.tmp + '/*', target);
    };

    if (self.done) {
        copy();
    } else {
        self.walker.on("end", copy);
    }

    return self;
};

Scaf.prototype.end = function () {
    var self = this;

    var clear = function () {
        $.rm('-r', self.tmp);
    };

    if (self.done) {
        clear();
    } else {
        self.walker.on("end", clear);
    }

    return self;
};

module.exports = function (tpl, options) {
    return new Scaf(tpl, options);
};
