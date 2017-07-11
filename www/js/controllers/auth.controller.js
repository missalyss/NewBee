angular.module('app.auth', [])

.controller('loginCtrl', function($scope, authService) {

  $scope.login = function (user) {
    console.log(user);
    authService.login(user).then(result => {
      console.log(result)
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
