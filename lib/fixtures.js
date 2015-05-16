Meteor.startup(function () {
  if (Meteor.isServer) {
    var blends = [
      {
        name: 'Supreme Blend',
        description: "Our signature blend that is arguably the most complex in terms of makeup contains a range of origins, varietals and processing methods. The Supreme Blend is a refined and zesty espresso based around carefully sourced Central Americal Coffees that create a sweet and balanced cup. To complement these two coffees we've added a Kenyan and Colombian to the mix giving this coffee its depth and zing.",
      },
      {
        name: 'The Origin Blend',
        description: "This blend has been made to showcase everything we love about great Ethiopian coffee, and consists of several varieties from different growing regions. With fruit flavours punching their way through, this espresso delivers a quintessentially Ethiopian flavour. It's bright and refined body adds another spectacular dimension and this coffee carries well through milk leaving you with chocolate berry notes."
      },
      {
        name: 'Five Star Day Blend',
        description: "Five Star Day is a seasonal espresso blend with a dynamic flavour profile that reflects coffee's seasonal nature. You can expect this blend to change distinctly 2 - 3 times a year to showcase the freshest crop we currently have."
      }
    ];
    if (! lyrid.pages.findOne({})) {
      _.each(blends, function (blend) {
        console.log(lyrid.pages.insert(blend));
      });
    }
  }
});
