
lyrid = {};

if (Meteor.isServer) {
  levelup = Meteor.npmRequire('levelup');
  mongodown = Meteor.npmRequire('mongodown');
  levelgraph = Meteor.npmRequire('levelgraph');
  lyrid.context = levelgraph(
    levelup(process.env.MONGO_URL, { db: mongodown })
  );
} else {
  lyrid.clientContext = new Mongo.Collection('context');
}
