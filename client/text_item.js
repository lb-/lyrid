"use strict";

Template.textItem.helpers({
  url: function () {
    return this.url || FlowRouter.path('page', {id: this.id});
  },
  class: function () {
    if (this.class) {
      return this.class;
    }
    return 'text item';
  },
  name: function () {
    var page = lyrid.pages.findOne({_id: this.id});
    if (page) {
      // console.log('page', page);
      return page.name;
    } else if (this.name) {
      return this.name;
    }
    return this.id;
  }
});
