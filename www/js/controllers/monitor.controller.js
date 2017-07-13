angular.module('app.monitor', [])

.controller('monitorCtrl', function($scope, monitorService) {
  // $scope.$on('$ionicView.enter', function() {
  //   monitorService.all().then(result => {
  //   })
  // })
})

.controller('tempCtrl', function($scope, monitorService) {
  $scope.tempChart = []

  $scope.$on('$ionicView.enter', function() {
    monitorService.all().then(result => {
      result.data.forEach(stat => {
        stat.date_recorded = new Date(stat.date_recorded)
        $scope.tempChart.push({temp: stat.temperature, date: stat.date_recorded})
      })
    })
  })

})

.controller('humidityCtrl', function($scope, monitorService) {
  $scope.humidityChart = []

  $scope.$on('$ionicView.enter', function() {
    monitorService.all().then(result => {
      result.data.forEach(stat => {
        stat.date_recorded = new Date(stat.date_recorded)
        $scope.humidityChart.push({temp: stat.humidity, date: stat.date_recorded})
      })
    })
  })

})
