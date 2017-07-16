angular.module('app.monitor', [])

.controller('monitorCtrl', function($scope, monitorService) {
  // $scope.$on('$ionicView.enter', function() {
  //   monitorService.all().then(result => {
  //   })
  // })
})

.controller('tempCtrl', function($scope, monitorService) {
  $scope.myColors = ['#1c5c96', '#bfa634', '#711217', '#4D0E52', '#1b5c29', '#262626']
  $scope.tempTimeLabels = []
  $scope.tempData = []
  $scope.tempOptions = {
    scales: {
        xAxes: [{
            type:'time',
            time: {
                displayFormats: {
                  minute: 'h:mm a'
                }
            }
        }],
        yAxes: [{
            ticks: {
                callback: function(value, index, values) {
                    return value + 'F'
                }
            }
        }]
    }

  }

    monitorService.all().then(result => {
      result.data.forEach(stat => {
        $scope.tempTimeLabels.push(stat.date_recorded)
        stat.temperature = toFahrenheit(stat.temperature)
        console.log(stat.temperature);
        $scope.tempData.push(stat.temperature)
      })
    })

    function toFahrenheit(degC){
      let result = degC * 1.8 + 32
      return result
    }

})

.controller('humidityCtrl', function($scope, monitorService) {
  $scope.humTimeLabels = []
  $scope.humData = []
  $scope.humOptions = {
        scales: {
            xAxes: [{
                type:'time',
                time: {
                    displayFormats: {
                      minute: 'h:mm a'
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    callback: function(value, index, values) {
                        return value + '%'
                    }
                }
            }]
        }
    }
    $scope.myColors = ['#1c5c96', '#bfa634', '#711217', '#4D0E52', '#1b5c29', '#262626']

  $scope.$on('$ionicView.enter', function() {
    monitorService.all().then(result => {
      result.data.forEach(stat => {
        stat.date_recorded = new Date(stat.date_recorded)

        $scope.humTimeLabels.push(stat.date_recorded)
        $scope.humData.push(stat.humidity)
      })
    })
  })

})
