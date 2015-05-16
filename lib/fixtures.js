Meteor.startup(function () {
  if (Meteor.isServer) {
    var pagesByName = {};
    var blends = [
      {
        name: 'Supreme Blend',
        description: "Our signature blend that is arguably the most complex in terms of makeup contains a range of origins, varietals and processing methods. The Supreme Blend is a refined and zesty espresso based around carefully sourced Central Americal Coffees that create a sweet and balanced cup. To complement these two coffees we've added a Kenyan and Colombian to the mix giving this coffee its depth and zing.",
        context: [
          ['Suitable For', 'Espresso'],
          ['Suitable For', 'Turkish'],
          ['Suitable For', 'Plunger'],
        ]
      },
      {
        name: 'The Origin Blend',
        description: "This blend has been made to showcase everything we love about great Ethiopian coffee, and consists of several varieties from different growing regions. With fruit flavours punching their way through, this espresso delivers a quintessentially Ethiopian flavour. It's bright and refined body adds another spectacular dimension and this coffee carries well through milk leaving you with chocolate berry notes.",
        context: [
          ['Suitable For', 'Espresso'],
          ['Suitable For', 'Turkish'],
        ]
      },
      {
        name: 'Five Star Day Blend',
        description: "Five Star Day is a seasonal espresso blend with a dynamic flavour profile that reflects coffee's seasonal nature. You can expect this blend to change distinctly 2 - 3 times a year to showcase the freshest crop we currently have.",
        context: [
          ['Suitable For', 'Plunger'],
          ['Suitable For', 'Turkish'],
          ['Suitable For', 'Pour Over'],
        ]
      }
    ];
    // if (! lyrid.pages.findOne({})) {
    if (true) {
      _.each(blends, function (blend) {
        var blendId = lyrid.pages.insert(blend);
        _.each(blend.context, function (contextItem) {

          //check if the object exists
          var contextItemName = contextItem[1];
          var contextItemPageId = pagesByName[contextItemName];

          if (! contextItemPageId) {
            // create page
            contextItemPageId = lyrid.pages.insert({
              name: contextItemName,
              description: 'no description',
            });
            // put page in object for potential future iterations
            pagesByName[contextItemName] = contextItemPageId;
          }

          //check if the predicate exists
          var contextItemPredicateName = contextItem[0];
          var contextItemPredicateId = pagesByName[contextItemPredicateName];
          if (! contextItemPredicateId) {
            // create page
            contextItemPredicateId = lyrid.pages.insert({
              name: contextItemPredicateName,
              description: 'no description',
            });
            // put page in object for potential future iterations
            pagesByName[contextItemPredicateName] = contextItemPredicateId;
          }

          var triple = {
            subject: blendId,
            predicate: contextItemPredicateId,
            object: contextItemPageId,
            _id: Random.id()
          };
          console.log('put triple', triple);
          lyrid.context.put(triple, function (error) {
            if (error) { console.log(error); }
          });

        });


      });
    }
  }
});
