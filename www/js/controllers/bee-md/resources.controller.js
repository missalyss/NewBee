angular.module('app.resources', [])

.controller('resourceCtrl', function($scope, $stateParams, $http, BEE_MD_ENDPOINT) {

})

.controller('symptomsCtrl', function ($scope, $stateParams, $http, BEE_MD_ENDPOINT) {

  $scope.$on('$ionicView.enter', function() {
    $http.get(`${BEE_MD_ENDPOINT.url}/symptoms`).then(result => {
      $scope.symptoms = result.data
      console.log($scope.symptoms);
    })
  })
})

.controller('causesCtrl', function ($scope, $stateParams, $http, BEE_MD_ENDPOINT) {

  $scope.$on('$ionicView.enter', function() {
    $http.get(`${BEE_MD_ENDPOINT.url}/causes`).then(result => {
      $scope.causes = result.data
      console.log($scope.causes);
    })
  })
})

.controller('treatmentsCtrl', function ($scope, $stateParams, $http, BEE_MD_ENDPOINT) {

  $scope.$on('$ionicView.enter', function() {
    $http.get(`${BEE_MD_ENDPOINT.url}/treatments`).then(result => {
      $scope.treatments = result.data
      console.log($scope.treatments);
    })
  })
})
