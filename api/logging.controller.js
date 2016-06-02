'use strict';
var fs = require('fs');

function Controller() {

    var log = function(req, res) {
        var data = req.body;
        console.log('%j', data);
        if (!data.message) {
            res.status(404).send({
                meesage: 'missed message param'
            });
            return;
        }

        var adding = '\n\n====================\n' + new Date().toString() + '\n';
        fs.appendFile('log/log.txt', adding + data.message, function(err) {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
        });

        res.status(200).send({
            meesage: 'done'
        });
    };

    var services = {
        log: function(req, res) {
            return log(req, res);
        }
    };
    return services;
}

module.exports = new Controller();
