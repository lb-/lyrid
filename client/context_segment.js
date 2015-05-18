"use strict";

Template.contextSegment.helpers({
  title: function () {
    return 'Suitable For';
  },
  total: function () {
    return 3;
  },
  items: function () {
    return [
      {name: 'Espresso'},
      {name: 'Plunger'}
    ];
  }
});
