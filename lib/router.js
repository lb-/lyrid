FlowRouter.route('/', {
  action: function (params) {
    console.log('params', params);
    FlowLayout.render('layout', {main: 'home'});
  }
});

FlowRouter.route('/page/:id', {
  action: function(params) {
    console.log("Yeah! We are on the page:", params.id);
    //work around until this is solved
    //https://github.com/meteorhacks/flow-router/issues/95
    Session.set('pageId', params.id);
    FlowLayout.render('layout', {main: 'page'});
  },
  name: 'page'
});
