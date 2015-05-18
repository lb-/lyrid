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

Meteor.publish('pages', function (query, options) {
  var fields = {
    _id: 1,
    name: 1,
  };
  var query = query || {};
  console.log('pages requested');
  return lyrid.pages.find(
    {},
    {fields: fields}
  );
});

Meteor.publish('context', function (pageId, options) {
  var self = this;

  lyrid.context.get({object:pageId}, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      _.each(results, function (result) {
        result.context = 'object';
        self.added('context', result._id, result);
      });
    }
  });

  lyrid.context.get({predicate:pageId}, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      _.each(results, function (result) {
        result.context = 'predicate';
        self.added('context', result._id, result);
      });
    }
  });

  lyrid.context.get({subject:pageId}, function (error, results) {
    if (error) {
      console.log(error);
    } else {
      _.each(results, function (result) {
        result.context = 'subject';
        self.added('context', result._id, result);
      });
    }
  });

  self.ready();
});
