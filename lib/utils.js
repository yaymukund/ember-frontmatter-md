var _glob = require('glob'),
    RSVP = require('rsvp'),
    fs = require('fs');

var _wrapNodeFunction = function(fn) {
  return function() {
    var deferred = RSVP.defer(),
        args = Array.prototype.slice.call(arguments, 0);

    args.push(function(err, results) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(results);
      }
    });

    fn.apply(null, args);
    return deferred.promise;
  };
};

exports.RSVP = RSVP;
exports.read = _wrapNodeFunction(fs.readFile);
exports.glob = _wrapNodeFunction(_glob);
