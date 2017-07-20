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

.controller('humidityCtrl', function($scope, monitorService, moment) {
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
    $scope.hTimeLabels = []
    $scope.hWeekLabels = []
    $scope.allLabels = []
    $scope.hData = []
    $scope.hWeekData = []

    $scope.hChart = 'today'
  $scope.$on('$ionicView.enter', function() {
    monitorService.all().then(result => {
      result.data.forEach((stat) => {
        let date = moment(stat.date_recorded)
        let lastEl = $scope.hTimeLabels[$scope.hTimeLabels.length - 1]
        let now = moment()
        let week = now.subtract(1, 'weeks')
        console.log('week ', week);
        if(date.isSame(now, 'day')){
          if ($scope.hTimeLabels.length === 0) {
            $scope.hTimeLabels.push(date)
            $scope.hData.push(stat.humidity)
          } else if (!date.isSame(lastEl, 'minute')) {
            $scope.hTimeLabels.push(date)
            $scope.hData.push(stat.humidity)
          }
        } else if (date.isBetween(week)) {
          if ($scope.hWeekLabels.length === 0) {
            $scope.hWeekLabels.push(date)
            $scope.hWeekData.push(stat.humidity)
          } else if (!date.isSame(lastEl, 'minute')) {
            $scope.hWeekLabels.push(date)
            $scope.hWeekData.push(stat.humidity)
          }

        }
        // console.log('date ', date, 'lastel ', lastEl);
      })
      // console.log('array ', $scope.hTimeLabels);
    })
  })
})

// let today = new Date()
// .getTime().toString().slice(0,8)
// today = parseInt(today)
// console.log(today.toDateString());
// today = `${today.getMonth()} ${today.getDate()}, ${today.getFullYear()}`

// lastEl = new Date(lastEl).getTime().toString().slice(0,8)
// lastEl = parseInt(lastEl)
// let date = new Date(stat.date_recorded).getTime().toString()
// date = date.slice(0,8)
// date = parseInt(date)
