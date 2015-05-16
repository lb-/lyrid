"use strict";

Template.registerHelper('route', function (name, _id) {
  return FlowRouter.path(name, {_id: _id});
});
