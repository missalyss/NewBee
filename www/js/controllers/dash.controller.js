angular.module('app.dash', [])

.controller('dashCtrl', function($scope, inspectionService, $state, monitorService) {
  inspectionService.all().then(result => {
    $scope.recentInspections = result.data
  })
  $scope.showLog = function (log) {
    $state.go('tab.inspection-show', {id: log.id})
  }

  $scope.lastStat = {}
  monitorService.all().then(result => {
    let lastStatIndex = result.data.length - 1
    $scope.lastStat = result.data[lastStatIndex]
    console.log($scope.lastStat);
    $scope.lastStat.temperature = Math.round($scope.lastStat.temperature * 1.8 + 32)
  })
})
