angular.module('app.monitor', [])

.controller('monitorCtrl', function($scope, monitorService) {
  $scope.sensors = {}

  monitorService.all().then(result => {
    result.data[0].temperature ? $scope.sensors.temperature = true : $scope.sensors.temperature = false
    result.data[0].humidity ? $scope.sensors.humidity = true : $scope.sensors.humidity = false
    result.data[0].acoustics ? $scope.sensors.acoustics = true : $scope.sensors.acoustics = false
    result.data[0].weight ? $scope.sensors.weight = true : $scope.sensors.weight = false
    result.data[0].brood_temp ? $scope.sensors.brood_temp = true : $scope.sensors.brood_temp = false

  })
})

.controller('tempCtrl', function($scope, monitorService) {
  $scope.myColors = ['#1c5c96']
  $scope.tOptions = {
    scales: {
        xAxes: [{
            type:'time',
            time: {
                displayFormats: {
                  minute: 'h:mm a',
                  hour: 'ha',
                  day: 'M/DD'
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
  $scope.tChart = 'today'

  $scope.tAllLabels = []
  $scope.tAllData = []
  $scope.tTodayLabels = []
  $scope.tTodayData = []
  $scope.tWeekLabels = []
  $scope.tWeekData = []
  $scope.tMonthLabels = []
  $scope.tMonthData = []

    monitorService.all().then(result => {

      result.data.forEach((stat) => {
        let tDate = moment(stat.date_recorded)
        let tLastEl = $scope.tTodayLabels[$scope.tTodayLabels.length - 1]
        let tLastElWeek = $scope.tWeekLabels[$scope.tWeekLabels.length - 1]
        let tLastElMonth = $scope.tMonthLabels[$scope.tMonthLabels.length - 1]
        let tLastElAll = $scope.tAllLabels[$scope.tAllLabels.length - 1]
        let tWeek = moment().subtract(1, 'weeks')
        let tMonth = moment().subtract(1, 'months')
        let tDay = moment().subtract(1, 'days')

        stat.temperature = toFahrenheit(stat.temperature)

        if(tDate.isBetween(tDay)){
          if ($scope.tTodayLabels.length === 0) {
            $scope.tTodayLabels.push(tDate)
            $scope.tTodayData.push(stat.temperature)
          } else if (!tDate.isSame(tLastEl, 'minute')) {
            $scope.tTodayLabels.push(tDate)
            $scope.tTodayData.push(stat.temperature)
          }
        }
        if (tDate.isBetween(tWeek)) {
          if ($scope.tWeekLabels.length === 0) {
            $scope.tWeekLabels.push(tDate)
            $scope.tWeekData.push(stat.temperature)
          } else if (!tDate.isSame(tLastElWeek, 'minute')) {
            $scope.tWeekLabels.push(tDate)
            $scope.tWeekData.push(stat.temperature)
          }
        }
        if (tDate.isBetween(tMonth)) {
          if ($scope.tMonthLabels.length === 0) {
            $scope.tMonthLabels.push(tDate)
            $scope.tMonthData.push(stat.temperature)
          } else if (!tDate.isSame(tLastElMonth, 'minute')) {
            $scope.tMonthLabels.push(tDate)
            $scope.tMonthData.push(stat.temperature)
          }
        }

        if ($scope.tAllLabels.length === 0) {
          $scope.tAllLabels.push(tDate)
          $scope.tAllData.push(stat.temperature)
        } else if (!tDate.isSame(tLastElAll, 'minute')) {
          $scope.tAllLabels.push(tDate)
          $scope.tAllData.push(stat.temperature)
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
                      minute: 'h:mm a',
                      hour: 'ha',
                      day: 'M/DD'
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
    $scope.myColors = ['#1c5c96']
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
        let lastElAll = $scope.hAllLabels[$scope.hAllLabels.length - 1]
        let week = moment().subtract(1, 'weeks')
        let month = moment().subtract(1, 'months')
        let day = moment().subtract(1, 'days')

        if(date.isBetween(day)){
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

        if ($scope.hAllLabels.length === 0) {
          $scope.hAllLabels.push(date)
          $scope.hAllData.push(stat.humidity)
        } else if (!date.isSame(lastElAll, 'minute')) {
          $scope.hAllLabels.push(date)
          $scope.hAllData.push(stat.humidity)
        }

      })
    })
  })
})
