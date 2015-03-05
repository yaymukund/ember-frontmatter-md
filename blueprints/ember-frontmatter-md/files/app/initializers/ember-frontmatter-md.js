import $ from 'jquery';

export default {
  name: 'ember-frontmatter-md',
  after: 'store',
  initialize: function(container, application) {
    var store = container.lookup('store:main'),
        metaName = application.name+'/app/posts',
        rawPosts = $('meta[name="'+metaName+'"]').attr('content'),
        posts = JSON.parse(unescape(rawPosts));

    store.pushPayload('post', { posts: posts });
  }
};
