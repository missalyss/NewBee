angular.module('app.inspect', [])

.controller('inspectCtrl',['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {
  $scope.inspectionsAll = []
  $scope.newLog = {}
  $scope.newLog.inspection_date = new Date()

  $scope.createLog = function (newLog) {
    console.log(newLog);
  }

  console.log($scope.inspectionsAll);
}])
