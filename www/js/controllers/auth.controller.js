angular.module('app.auth', [])

.controller('loginCtrl', function($scope, authService, $state) {

  $scope.login = function (user) {
    authService.login(user)
    .then(result => {
      console.log(result.data);
      authService.store(result.data.token)
      $state.go('tab.dash')
    })
  }
})

.controller('signupCtrl', function($scope, authService, $state) {
  $scope.signup = function (user) {
    authService.signup(user)
    .then(result => {
      authService.store(result.data.token)
      $state.go('tab.dash')
    })
  }
})

.controller('userCtrl', function ($scope, $state, authService, userService) {
  $scope.userData = {}

  $scope.$on('$ionicView.enter', function() {
    userService.thisUser().then(result => {
      $scope.userData = result.data
    })
  })

  $scope.logUserOut = function() {
    authService.logout()
    $state.go('login')
  }
})


.controller('userEditCtrl', function($scope, userService, $http, API_ENDPOINT, $state) {
  $scope.$on('$ionicView.enter', function() {
    userService.thisUser()
    .then(result => {
      $scope.userData = result.data
    })
  })

  $scope.editUser = function (userData) {
    console.log('req.body ', userData);
    $http.put(`${API_ENDPOINT.url}/users`, userData).then(result => {
      $state.go('tab.dash-user')
    })
  }
})
