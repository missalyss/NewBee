angular.module('app.monitor', [])

.controller('monitorCtrl', function($scope, monitorService) {
  // $scope.$on('$ionicView.enter', function() {
  //   monitorService.all().then(result => {
  //   })
  // })
})

.controller('tempCtrl', function($scope, monitorService) {
  $scope.myColors = ['#1c5c96', '#bfa634', '#711217', '#4D0E52', '#1b5c29', '#262626']
  $scope.tData = []
  $scope.tTimeLabels = []

  $scope.tOptions = {
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

      result.data.forEach((stat) => {

        let date = new Date(stat.date_recorded).getTime().toString()
        date = date.slice(0,8)
        date = parseInt(date)

        let lastEl = $scope.tTimeLabels[$scope.tTimeLabels.length - 1]
        lastEl = new Date(lastEl).getTime().toString().slice(0,8)
        lastEl = parseInt(lastEl)
        if ($scope.tTimeLabels.length === 0) {
          $scope.tTimeLabels.push(stat.date_recorded)
          stat.temperature = toFahrenheit(stat.temperature)
          $scope.tData.push(stat.temperature)
        } else if (date != lastEl) {
          $scope.tTimeLabels.push(stat.date_recorded)
          stat.temperature = toFahrenheit(stat.temperature)
          $scope.tData.push(stat.temperature)
        }

      })
    })

    function toFahrenheit(degC){
      let result = Math.round(degC * 1.8 + 32)
      return result
    }

})

.controller('humidityCtrl', function($scope, monitorService) {
  $scope.hTimeLabels = []
  $scope.hData = []
  $scope.hOptions = {
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
      result.data.forEach((stat) => {

        let date = new Date(stat.date_recorded).getTime().toString()
        date = date.slice(0,8)
        date = parseInt(date)

        let lastEl = $scope.hTimeLabels[$scope.hTimeLabels.length - 1]
        lastEl = new Date(lastEl).getTime().toString().slice(0,8)
        lastEl = parseInt(lastEl)
        if ($scope.hTimeLabels.length === 0) {
          $scope.hTimeLabels.push(stat.date_recorded)
          $scope.hData.push(stat.humidity)
        } else if (date != lastEl) {
          $scope.hTimeLabels.push(stat.date_recorded)
          $scope.hData.push(stat.humidity)
        }
      })
    })
  })
})
