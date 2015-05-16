FlowRouter.route('/', {
  action: function (params) {
    console.log('params', params);
    FlowLayout.render('layout', {main: 'home'});
  }
});

FlowRouter.route('/page/:_id', {
  action: function(params) {
    console.log("Yeah! We are on the page:", params._id);
    //work around until this is solved
    //https://github.com/meteorhacks/flow-router/issues/95
    Session.set('pageId', params._id);
    FlowLayout.render('layout', {main: 'page'});
  },
  name: 'page'
});
