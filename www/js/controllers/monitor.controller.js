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
    $scope.hAllLabels = []
    $scope.hAllData = []
    $scope.hTodayLabels = []
    $scope.hTodayData = []
    $scope.hWeekLabels = []
    $scope.hWeekData = []
    $scope.hMonthLabels = []
    $scope.hMonthData = []

    $scope.hChart = 'today'
  $scope.$on('$ionicView.enter', function() {
    monitorService.all().then(result => {
      result.data.forEach((stat) => {
        let date = moment(stat.date_recorded)
        let lastEl = $scope.hTodayLabels[$scope.hTodayLabels.length - 1]
        let lastElWeek = $scope.hWeekLabels[$scope.hWeekLabels.length - 1]
        let lastElMonth = $scope.hMonthLabels[$scope.hMonthLabels.length - 1]

        let now = moment()
        let week = moment().subtract(1, 'weeks')
        let month = moment().subtract(1, 'months')
        if(date.isSame(now, 'day')){
          if ($scope.hTodayLabels.length === 0) {
            $scope.hTodayLabels.push(date)
            $scope.hTodayData.push(stat.humidity)
          } else if (!date.isSame(lastEl, 'minute')) {
            $scope.hTodayLabels.push(date)
            $scope.hTodayData.push(stat.humidity)
          }
        }
        if (date.isBetween(week)) {
          if ($scope.hWeekLabels.length === 0) {
            $scope.hWeekLabels.push(date)
            $scope.hWeekData.push(stat.humidity)
          } else if (!date.isSame(lastEl, 'minute')) {
            $scope.hWeekLabels.push(date)
            $scope.hWeekData.push(stat.humidity)
          }
        }
        if (date.isBetween(month)) {
          if ($scope.hMonthLabels.length === 0) {
            $scope.hMonthLabels.push(date)
            $scope.hMonthData.push(stat.humidity)
          } else if (!date.isSame(lastElMonth, 'minute')) {
            $scope.hMonthLabels.push(date)
            $scope.hMonthData.push(stat.humidity)
          }
        }
      })
    })
  })
})
