"use strict";

if (Meteor.isServer) {
  lyrid.context = levelgraph('context');
}
// console.log(levelgraph);
// could not get to work on client
// lyrid.context = levelgraph('context');
