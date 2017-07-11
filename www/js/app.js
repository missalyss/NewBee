// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'app.auth', 'app.dash', 'app.services', 'app.monitor', 'app.inspect', 'app.resources'])

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
      StatusBar.styleDefault();
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

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'dashCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/auth/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/auth/signup.html',
    controller: 'signupCtrl'
  })

  // Each tab has its own nav history stack:

  .state('tab.resources', {
    url: '/resources',
    views: {
      'tab-resources': {
        templateUrl: 'templates/tab-resources.html',
        controller: 'resourceCtrl'
      }
    }
  })

  .state('tab.monitor', {
      url: '/monitor',
      views: {
        'tab-monitor': {
          templateUrl: 'templates/tab-monitor.html',
          controller: 'monitorCtrl'
        }
      }
    })

  .state('tab.inspect', {
    url: '/inspections',
    views: {
      'tab-inspect': {
        templateUrl: 'templates/inspection/tab-inspect.html',
        controller: 'inspectAllCtrl'
      }
    }
  })

  .state('tab.inspection-new', {
    url: '/inspections/new',
    views: {
      'tab-inspect': {
        templateUrl: 'templates/inspection/new.html',
        controller: 'inspectPostCtrl'
      }
    }
  })

  .state('tab.inspection-show', {
    url: '/inspections/show/{id}',
    views: {
      'tab-inspect': {
        templateUrl: 'templates/inspection/show.html',
        controller: 'inspectShowCtrl'
      }
    }
  })

  .state('tab.inspection-edit', {
    url: '/inspections/edit/{id}',
    views: {
      'tab-inspect': {
        templateUrl: 'templates/inspection/edit.html',
        controller: 'inspectEditCtrl'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
