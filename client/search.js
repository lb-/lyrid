"use strict";

Template.search.onCreated(function () {
  var instance = this;
  instance.searchValue = new ReactiveVar();
  instance.searchResults = new ReactiveVar([]);
  instance.searchReturned = new ReactiveVar(false);
  instance.searchValid = new ReactiveVar(false);
  //A version of Tracker.autorun that is stopped when the template is destroyed.

  //reruns on searchValue change
  instance.autorun(function () {
    var searchValue = instance.searchValue.get();
    var clearResults = false;
    if (searchValue) {
      console.log('search value', searchValue);
      if (searchValue.length > 2) {
        instance.searchValid.set(true);
        Meteor.call('search', searchValue, {}, function (error, result ) {
          instance.searchReturned.set(true);
          if (error) {
            toastr.error(error.message);
          } else {
            instance.searchResults.set(result);
          }
        });
      } else {
        clearResults = true;
      }
    } else {
      clearResults = true;
      console.log('no search value');
    }

    if (clearResults) {
      instance.searchValid.set(false);
      instance.searchReturned.set(false);
      instance.searchResults.set([]);
    }
  });

  instance.autorun(function () {
    var searchReturned = instance.searchReturned.get();
    var searchResults = instance.searchResults.get();
    if (instance.view.isRendered) {
      if (searchReturned && searchResults) {
        console.log('search returned');
        var generatedResults = instance.$('.ui.search').search('generate results', searchResults);
        instance.$('.ui.search').search('add results', generatedResults);
        //console.log(generatedResults);
        // instance.$('.ui.search').search('add results', "foo");
        // instance.$('.ui.search').search('show results');
      } else {
        console.log('search not returned');
        instance.$('.ui.search').search('hide results');
      }
    }

  });

  instance.autorun(function () {
    var searchValid = instance.searchValid.get();
    var searchReturned = instance.searchReturned.get();
    if (instance.view.isRendered) {
      if (searchValid && !searchReturned) {
        instance.$('.ui.search').search('set loading');
      } else {
        instance.$('.ui.search').search('remove loading');
      }
    }

  });

});

Template.onRendered(function () {
  this.$('.ui.search').search({
    onSelect: function () {
      //console.log('on select', this, result, response);
      //nasty hack but works
      FlowRouter.go($(this).find('.result.active')[0].getAttribute('href'))
    },
    apiSettings: {
      beforeSend: function() {
        return false;
      },
      // onSelect: function (result, response) {
      //   console.log('on select', result);
      // },
      // onResultsOpen: function () {
      //   console.log('open results', this);
      // },
    }
  });
});

Template.search.events({
  'keyup .prompt' : function (event, template) {
    // var value = event.target.value;
    var $search = template.$('.ui.search');
    var value = $search.search('get value');
    Template.instance().searchValue.set(value);
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
    // var testHtmlResults = $search.search('generate results', testResult);
    // console.log('testHtmlResults', testHtmlResults);
    // $search.search('add results', testHtmlResults);
    // add results(html)
//     $('.your.element')
//   .search('behavior name', argumentOne, argumentTwo)
// ;
    //console.log(event.target.value);
    // $search.search('add results', '<strong>foo</strong>');
    //$search.search('show results');
  },
});

// Template.search.helpers({
//   // results: function () {
//   //   var results = Template.instance().searchResults.get();
//   //   console.log('results', results);
//   //   return results;
//   // },
//   loading: function () {
//     var searchValid = Template.instance().searchValid.get();
//     var searchReturned = Template.instance().searchReturned.get();
//     if (searchValid && !searchReturned) {
//       return 'loading';
//     }
//   }
// });
