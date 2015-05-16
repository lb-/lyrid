"use strict";

Template.pageList.onCreated(function () {
  var instance = this;

  //reactivevar for if the subscription is loaded
  instance.loaded = new ReactiveVar(false);

  //subscriptions
  instance.autorun(function () {
    console.log('asking for pages');
    var subscription = instance.subscribe('pages', {});
    if (subscription.ready()) {
      console.log('pages received');
      instance.loaded.set(true);
    } else {
      console.log('subscription not ready yet');
    }
  });

  //cursor

  instance.pages = function () {
    return lyrid.pages.find({});
  }

});

Template.pageList.helpers({
  totalpages: function () {
    var loaded = Template.instance().loaded.get()
    if (loaded) {
      return Template.instance().pages().count();
    }
    return '...';
  },
  pages: function () {
    var pages = Template.instance().pages();
    return pages;
  },
  loaded: function () {
    var loaded = Template.instance().loaded.get()
    return loaded;
  }
});
