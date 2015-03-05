/* jshint node: true */
'use strict';

var compileFrontmatterMarkdown = require('./lib/compile-frontmatter-markdown'),
    path = require('path'),
    _posts;

module.exports = {
  name: 'ember-frontmatter-md',

  preBuild: function() {
    var appName = this.parent.pkg.name,
        filenames = path.join(
          this.parent.root,
          this.treePaths.app,
          'posts', '*.md'
        );

    return compileFrontmatterMarkdown(filenames).then(function(posts) {
      if (!posts) { return; }
      posts = JSON.stringify(posts);
      posts = escape(posts);
      _posts = '<meta name="'+appName+'/app/posts" content="'+posts+'">';
    });
  },

  contentFor: function(type, config) {
    if (type === 'posts') {
      return _posts;
    }
  }
};
