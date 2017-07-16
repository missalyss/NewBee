angular.module('app.dash', [])

.controller('dashCtrl', function($scope, inspectionService, $state) {
  inspectionService.all().then(result => {
    $scope.recentInspections = result.data
  })
  $scope.showLog = function (log) {
    $state.go('tab.inspection-show', {id: log.id})
  }
})

.controller('userCtrl', function ($scope, $state, authService) {
  

  $scope.logUserOut = function() {
    authService.logout()
    $state.go('login')
  }
})
