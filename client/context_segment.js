"use strict";

Template.contextSegment.helpers({
  title: function () {
    return this.title || 'Default Title';
  },
  total: function () {
    return this.items.length;
  },
  items: function () {
    return this.items || [];
  }
});
