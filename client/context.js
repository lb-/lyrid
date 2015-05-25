"use strict";

Template.context.onCreated(function () {
  var instance = this;

  instance.autorun(function () {
    var pageId = Session.get('pageId');
    var subscription = instance.subscribe('context', pageId);
  });

  instance.autorun(function () {
    var pageIds = [];
    _.each(lyrid.clientContext.find({}).fetch(), function (doc) {
      pageIds.push(doc.subject);
      pageIds.push(doc.predicate);
      pageIds.push(doc.predicate);
    });
    var query = {_id: {$or: pageIds}};
    var subscription = instance.subscribe('pages', query);
  });

});

//if page is subject,

Template.context.helpers({
  contextTriples: function () {
    return lyrid.clientContext.find({}).fetch();
  },
  groupings: function () {
    var triples = lyrid.clientContext.find({}).fetch();
    var pageId = Session.get('pageId');
    //group by subject first
    var groupedByContext = _.groupBy(triples, 'context');
    var result = [];
    var types = {
      subject: { groupBy: 'predicate' },
      predicate: { groupBy: 'object' },
      object: { groupBy: 'predicate' },
    };
    //not super sure on next steps
    // _.each(groupedByContext, function (itemsForContext, context) {
    //   _.each(_.groupBy(itemsForContext, 'predicate'), function (items, predicate) {
    //     // the relevantId will NOT be the predicate
    //     // the relvantId will NOT be the pageId
    //     items = _.map(items, function (item) {
    //       var ids = [item.subject, item.predicate, item.object];
    //       item.relevantId = _.difference(ids, [predicate, pageId])[0];
    //       return item;
    //     });
    //     console.log(items);
    //     result.push({title: predicate, items: items});
    //   });
    // });
    _.each(groupedByContext, function (itemsForContext, context) {
      //for each context; subject, predicate, object
      _.each(types, function (typeMapping, typeName) {

        //if the current page is the subject, group by predicate & list the object
        //if the current page is the predicate, group by object & list the subject
        //if the current page is object, group by predicate and list the subject
        _.each(_.groupBy(itemsForContext, typeMapping.groupBy), function (items, groupingContextItem) {
          items = _.map(items, function (item) {
            var ids = [item.subject, item.predicate, item.object];
            item.relevantId = _.difference(ids, [groupingContextItem, pageId])[0];
            return item;
          });
          // console.log(items);
          result.push({title: groupingContextItem, items: items});
        });
      });
    });
    return result;
  }
})
