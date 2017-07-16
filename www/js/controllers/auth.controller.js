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

.controller('userCtrl', function ($scope, $state, authService, userService, $http, API_ENDPOINT) {
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


.controller('userEditCtrl', function($scope, authService, userService, $http, API_ENDPOINT, $state, $ionicPopup) {
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

  $scope.deleteAccount = function () {
    var deleteAccountPopup = $ionicPopup.confirm({
      title: 'Are you sure you want to delete your account?',
      template: 'This will delete all of your inspection and monitor data as well. You cannot undo this action.'
    })

    deleteAccountPopup.then((res) => {
      if(res) {
        $http.delete(`${API_ENDPOINT.url}/users`).then(() => {
          authService.logout()
          $state.go('signup')
        })
      }
    })

  }
})
