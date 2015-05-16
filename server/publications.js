"use strict";

Meteor.publish('page', function (pageId) {
  var fields = {
    description: 1,
    name: 1,
  };
  return lyrid.pages.find(
    {_id: pageId},
    {fields: fields}
  );
});
