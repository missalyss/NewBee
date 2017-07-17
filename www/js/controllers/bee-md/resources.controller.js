angular.module('app.resources', [])

.controller('resourceCtrl', function($scope, $stateParams, $http, BEE_MD_ENDPOINT) {

})

.controller('symptomsCtrl', function ($scope, $stateParams, $http, BEE_MD_ENDPOINT, symptomsService) {

  $scope.$on('$ionicView.enter', function() {
    symptomsService.all().then(result => {
      $scope.symptoms = result.data
      console.log($scope.symptoms);
    })
  })
})

.controller('causesCtrl', function ($scope, $stateParams, $http, BEE_MD_ENDPOINT, causesService) {

  $scope.$on('$ionicView.enter', function() {
    causesService.all().then(result => {
      $scope.causes = result.data
      console.log($scope.causes);
    })
  })
})

.controller('treatmentsCtrl', function ($scope, $stateParams, $http, BEE_MD_ENDPOINT, treatmentsService) {

  $scope.$on('$ionicView.enter', function() {
    treatmentsService.all().then(result => {
      $scope.treatments = result.data
      console.log($scope.treatments);
    })
  })
})
