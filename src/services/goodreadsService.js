var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({ explicitArray: false });

var goodreadService = function () {

    var getBookById = function (id, callback) {

        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/656?format=xml&key=mN1DyVoFS4cfbCMh5HmnpA'
        };
        var cb = function (response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                xml2js.parseString(str, function (err, result) {
                    callback(null, result.goodreadsResponse.book);
                });
            });
        };


        http.request(options, cb).end();
    };

    return {
        getBookById: getBookById

    };
};

module.exports = goodreadService;