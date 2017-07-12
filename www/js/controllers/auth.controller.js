angular.module('app.auth', [])

.controller('loginCtrl', function($scope, authService, $state) {

  $scope.login = function (user) {
    authService.login(user)
    .then(result => {
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
