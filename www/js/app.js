// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('ctcroombookingapp', ['ionic', 'ctcroombookingapp.controllers', 'ctcroombookingapp.services', 'ctcroombookingapp.config'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.welcome', {
    url: '/welcome',
    views: {
      'tab-welcome': {
        templateUrl: 'templates/tab-welcome.html',
        controller: 'WelcomeCtrl'
      }
    }
  })
 
  .state('tab.aboutus', {
    url: '/aboutus',
    views: {
      'tab-aboutus': {
        templateUrl: 'templates/tab-aboutus.html',
        controller: 'AboutUsCtl'
      }
    }
  })
 
  .state('tab.browserooms', {
    url: '/browserooms',
    views: {
      'tab-browserooms': {
        templateUrl: 'templates/tab-browserooms.html',
        controller: 'BrowseRoomsCtl'
      }
    }
  })
 
  .state('tab.listroombookings', {
    url: '/listroombookings?request',
    views: {
      'tab-browserooms': {
        templateUrl: 'templates/tab-listroombookings.html',
        controller: 'ListRoomBookingsCtl'
      }
    }
  })
  
  .state('tab.makeabooking', {
    url: '/makeabooking',
    views: {
      'tab-makeabooking': {
        templateUrl: 'templates/tab-makeabooking.html',
        controller: 'MakeABookingCtl'
      }
    }
  })
  
  .state('tab.makeabooking-listrooms', {
    url: '/makeabooking-listrooms?request',
    views: {
      'tab-makeabooking': {
        templateUrl: 'templates/tab-makeabooking-listrooms.html',
        controller: 'MakeABookingListRoomsCtl'
      }
    }
  })
  
  .state('tab.mybookings', {
    url: '/mybookings',
    views: {
      'tab-mybookings': {
        templateUrl: 'templates/tab-mybookings.html',
        controller: 'MyBookingsCtl'
      }
    }
  })
 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/welcome');

});
