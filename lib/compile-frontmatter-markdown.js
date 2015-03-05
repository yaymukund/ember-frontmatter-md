var frontMatter = require('yaml-front-matter'),
    utils = require('./utils'),
    marked = require('marked');

var _parse = function(filename) {
  return utils.read(filename).then(function(contents) {
    return frontMatter.loadFront(contents, 'body');
  });
};

module.exports = function(glob) {
  return utils.glob(glob).then(function(filenames) {
    var promises = filenames.map(_parse);
    return utils.RSVP.map(promises, function(post) {
      post.body = marked(post.body);
      return post;
    });
  });
};
