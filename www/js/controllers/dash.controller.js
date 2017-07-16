angular.module('app.dash', [])

.controller('dashCtrl', function($scope, inspectionService, $state, monitorService, userService) {
  $scope.lastStat = {}
  $scope.username

  $scope.$on('$ionicView.enter', function () {
    userService.thisUser().then(result => {
      $scope.username = result.data.username
    })

    inspectionService.all().then(result => {
      $scope.recentInspections = result.data
    })

    monitorService.all().then(result => {
      let lastStatIndex = result.data.length - 1
      $scope.lastStat = result.data[lastStatIndex]
      $scope.lastStat.temperature = Math.round($scope.lastStat.temperature * 1.8 + 32)
    })
  })


  $scope.showLog = function (log) {
    $state.go('tab.inspection-show', {id: log.id})
  }

})
