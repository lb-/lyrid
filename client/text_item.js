"use strict";

Template.textItem.helpers({
  url: function () {
    return this.url || 'use flowrouter here';
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
