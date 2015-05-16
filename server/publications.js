"use strict";

Meteor.publish('page', function (pageId) {
  var fields = {
    description: 1,
    name: 1,
    _id: 1,
  };
  return lyrid.pages.find(
    {_id: pageId},
    {fields: fields}
  );
});

Meteor.publish('pages', function (options) {
  var fields = {
    _id: 1,
    name: 1,
  };
  console.log('pages requested');
  return lyrid.pages.find(
    {},
    {fields: fields}
  );
});
