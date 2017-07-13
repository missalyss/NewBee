angular.module('app.monitor', [])

.controller('monitorCtrl', function($scope, monitorService) {
  // $scope.$on('$ionicView.enter', function() {
  //   monitorService.all().then(result => {
  //   })
  // })
})

.controller('tempCtrl', function($scope, monitorService) {
  // $scope.tempChart = []
  //
  // $scope.$on('$ionicView.enter', function() {
  //   monitorService.all().then(result => {
  //     result.data.forEach(stat => {
  //       stat.date_recorded = new Date(stat.date_recorded)
  //       $scope.tempChart.push({temp: stat.temperature, date: stat.date_recorded})
  //     })
  //   })
  // })


  $scope.timeLabels = ["January", "February", "March", "April", "May", "June", "July"];
    //  $scope.series = ['Series A', 'Series B'];
     $scope.tempData = [
         65, 59, 80, 81, 56, 55, 40
     ]

     $scope.options = {
        scales: {
          yAxes: [
            {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left'
            },
            {
              id: 'y-axis-2',
              type: 'linear',
              display: true,
              position: 'right'
            }
          ]
        }
      }

     console.log('labels ',$scope.timeLabels);



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
