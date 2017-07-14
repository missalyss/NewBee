angular.module('app.monitor', [])

.controller('monitorCtrl', function($scope, monitorService) {
  // $scope.$on('$ionicView.enter', function() {
  //   monitorService.all().then(result => {
  //   })
  // })
})

.controller('tempCtrl', function($scope, monitorService) {
  $scope.timeLabels = []
  $scope.tempData = []
  $scope.tempOptions = {}

    monitorService.all().then(result => {
      result.data.forEach(stat => {
        // stat.date_recorded = new Date(stat.date_recorded)
        $scope.timeLabels.push(stat.date_recorded)
        $scope.tempData.push(stat.temperature)
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
