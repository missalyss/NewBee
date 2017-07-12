angular.module('app.dash', [])

.controller('dashCtrl', function($scope, inspectionService, $state) {
  inspectionService.all().then(result => {
    $scope.recentInspections = result.data
  })
})

.controller('userCtrl', function ($scope, $state, authService) {
  $scope.logUserOut = function() {
    authService.logout()
    $state.go('login')
  }
})
