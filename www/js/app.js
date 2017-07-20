angular.module('app', ['ionic', 'app.auth', 'app.dash', 'app.auth-services', 'app.services', 'app.bee-md-services', 'app.monitor', 'app.inspect', 'app.resources', 'app.glossary', 'app.symptoms', 'app.causes', 'app.treatments', 'angularMoment', 'chart.js'])

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
  })
})

.run(function ($rootScope, $state, authService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
    if (!authService.isAuthenticated()) {
      if (next.name !== 'login' && next.name !== 'signup') {
        event.preventDefault();
        $state.go('login');
      }
    }
  })
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
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

// DASHBOARD
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'dashCtrl'
      }
    }
  })

  .state('tab.dash-user', {
    url: '/user',
    views: {
      'tab-dash': {
        templateUrl: 'templates/auth/user-home.html',
        controller: 'userCtrl'
      }
    }
  })

  .state('tab.dash-user-edit', {
    url: '/user/edit',
    views: {
      'tab-dash': {
        templateUrl: 'templates/auth/user-edit.html',
        controller: 'userEditCtrl'
      }
    }
  })

// MONITOR
  .state('tab.monitor', {
    url: '/monitor',
    views: {
      'tab-monitor': {
        templateUrl: 'templates/monitor/tab-monitor.html',
        controller: 'monitorCtrl'
      }
    }
  })

  .state('tab.monitor-temp', {
    url: '/monitor/temp',
    views: {
      'tab-monitor': {
        templateUrl: 'templates/monitor/temp.html',
        controller: 'tempCtrl'
      }
    }
  })

  .state('tab.monitor-humidity', {
    url: '/monitor/humidity',
    views: {
      'tab-monitor': {
        templateUrl: 'templates/monitor/humidity.html',
        controller: 'humidityCtrl'
      }
    }
  })

// INSPECTIONS
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

  // RESOURCES
    .state('tab.resources', {
      url: '/resources',
      views: {
        'tab-resources': {
          templateUrl: 'templates/resources/tab-resources.html',
          controller: 'resourceCtrl'
        }
      }
    })

    .state('tab.resources-glossary', {
      url: '/resources/glossary',
      views: {
        'tab-resources': {
          templateUrl: 'templates/resources/glossary.html',
          controller: 'glossaryCtrl'
        }
      }
    })

    .state('tab.resources-glossary-show', {
      url: '/resources/glossary/{id}',
      views: {
        'tab-resources': {
          templateUrl: 'templates/resources/glossary-show.html',
          controller: 'glossaryShowCtrl'
        }
      }
    })

    .state('tab.resources-symptoms', {
      url: '/resources/symptoms',
      views: {
        'tab-resources': {
          templateUrl: 'templates/resources/symptoms.html',
          controller: 'symptomsCtrl'
        }
      }
    })
    .state('tab.resources-symptoms-show', {
      url: '/resources/symptoms/{id}',
      views: {
        'tab-resources': {
          templateUrl: 'templates/resources/symptoms-show.html',
          controller: 'symptomsShowCtrl'
        }
      }
    })

    .state('tab.resources-causes', {
      url: '/resources/causes',
      views: {
        'tab-resources': {
          templateUrl: 'templates/resources/causes.html',
          controller: 'causesCtrl'
        }
      }
    })

    .state('tab.resources-causes-show', {
      url: '/resources/causes/{id}',
      views: {
        'tab-resources': {
          templateUrl: 'templates/resources/causes-show.html',
          controller: 'causesShowCtrl'
        }
      }
    })

    .state('tab.resources-treatments', {
      url: '/resources/treatments',
      views: {
        'tab-resources': {
          templateUrl: 'templates/resources/treatments.html',
          controller: 'treatmentsCtrl'
        }
      }
    })

    .state('tab.resources-treatments-show', {
      url: '/resources/treatments/{id}',
      views: {
        'tab-resources': {
          templateUrl: 'templates/resources/treatments-show.html',
          controller: 'treatmentsShowCtrl'
        }
      }
    })


  $urlRouterProvider.otherwise('/tab/dash')

})
