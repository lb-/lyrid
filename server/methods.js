"use strict";

Meteor.methods({
  search: function (searchValue, options) {
    console.log(searchValue, options);

    var start = new moment();

    var index = lunr(function () {
      this.field('name', {boost: 100});
      this.field('description');
      this.ref('_id');
    });
    var pages = lyrid.pages.find({}).fetch();
    _.each(pages, function (page) {
      index.add(page);
    });

    console.log('index took:', moment().diff(start, 'milliseconds'));

    var searchResults = index.search(searchValue);

    //generating an object like this
    //http://semantic-ui.com/modules/search.html#initializing
    var result = {results: []};

    _.each(searchResults, function (searchResult) {
      var page = _.findWhere(pages, {_id: searchResult.ref});
      if (page) {
        result.results.push({
          _id: page._id,
          title: page.name,
          url: '/page/' + page._id,
          score: searchResult.score,
        });
      }

      // returnedResults.push(lyrid.pages.findOne({_id:searchResult.ref}));
    });

    console.log(result);

    return result;
  }
});

// var testResult = {
//   "results": [
//     {
//       "title": "Result Title",
//       "url": "/optional/url/on/click",
//       "image": "optional-image.jpg",
//       "price": "Optional Price",
//       "description": "Optional Description"
//     },
//     {
//       "title": "Result Title",
//       "description": "Result Description"
//     }
//   ],
//   // optional action below results
//   "action": {
//     "url": '/path/to/results',
//     "text": "View all 202 results"
//   }
// };
