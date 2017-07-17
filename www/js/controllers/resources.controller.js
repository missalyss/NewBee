angular.module('app.resources', [])

.controller('resourceCtrl', function($scope, $stateParams, $http) {

  const apiUrl = `https://bee-md.herokuapp.com`

  $scope.$on('$ionicView.enter', function() {
    $http.get(`${apiUrl}/glossary`).then(result => {
      $scope.glossary = result.data
      console.log($scope.glossary);
    })
  })

    // $http.get(`${apiUrl}/causes`).then(result => {
    //
    // })
})

.controller('glossaryCtrl', function ($scope, $stateParams, $http) {
  const apiUrl = `https://bee-md.herokuapp.com`

  $scope.$on('$ionicView.enter', function() {
    $http.get(`${apiUrl}/glossary`).then(result => {
      $scope.glossary = result.data
      console.log($scope.glossary);
    })
  })
})

.controller('symptomsCtrl', function ($scope, $stateParams, $http) {
  const apiUrl = `https://bee-md.herokuapp.com`

  $scope.$on('$ionicView.enter', function() {
    $http.get(`${apiUrl}/symptoms`).then(result => {
      $scope.symptoms = result.data
      console.log($scope.symptoms);
    })
  })
})

.controller('causesCtrl', function ($scope, $stateParams, $http) {
  const apiUrl = `https://bee-md.herokuapp.com`

  $scope.$on('$ionicView.enter', function() {
    $http.get(`${apiUrl}/causes`).then(result => {
      $scope.causes = result.data
      console.log($scope.causes);
    })
  })
})

.controller('treatmentsCtrl', function ($scope, $stateParams, $http) {
  const apiUrl = `https://bee-md.herokuapp.com`

  $scope.$on('$ionicView.enter', function() {
    $http.get(`${apiUrl}/treatments`).then(result => {
      $scope.treatments = result.data
      console.log($scope.treatments);
    })
  })
})
