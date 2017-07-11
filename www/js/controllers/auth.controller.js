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

.controller('signupCtrl', function($scope, authService) {
  $scope.signup = function (user) {
    console.log('user ', user);
    authService.signup(user).then(result => {
      console.log(result)
    })
  }
})
