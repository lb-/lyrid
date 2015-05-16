"use strict";

Template.page.onCreated(function () {
  var instance = this;
  var pageId = Session.get('pageId');
  // console.log('pageId', pageId);

  //reactivevar for if the subscription is loaded
  instance.loaded = new ReactiveVar(false);

  //subscriptions
  instance.autorun(function () {
    // console.log('asking for page', pageId);
    var subscription = instance.subscribe('page', pageId);
    if (subscription.ready()) {
      // console.log('page received');
      instance.loaded.set(true);
    } else {
      console.log('subscription not ready yet');
    }
  });

  //cursor

  instance.page = function () {
    return lyrid.pages.findOne({_id: pageId});
  }

});

Template.page.helpers({
  page: function () {
    var page = Template.instance().page()
    return page;
  },
  loaded: function () {
    var loaded = Template.instance().loaded.get()
    return loaded;
  }
});
